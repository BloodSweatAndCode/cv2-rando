const _ = require('lodash');
const fs = require('fs').promises;
const items = require('./items');
const path = require('path');
const vm = require('vm');
const { assemble, bank, core, memory, utils } = require('../../../lib');
const { log, modData, modSubroutine, modText, pad, randomInt, textToBytes } = utils;

const sharedItemTypes = [
	'garlicAljiba',
	'laurelsAljiba',
	'garlicAlba',
	'laurelsAlba',
	'laurelsOndol',
	'laurelsDoina',
	'oakRing',
	'oakRib',
	'oakHeart',
	'oakEye',
	'oakNail'
];

function asmFile(name) {
	return path.join(__dirname, 'asm', name);
}

// return an array of all actors that can hold an item
function itemActors() {
	return core
		.filter(c => c.actors)
		.map(c => c.actors.filter(a => a.holdsItem))
		.filter(c => c.length > 0)
		.reduce((a,c) => a.concat(c), []);
}

// distribute all items in the game to actors that can hold them, based on progression logic
function randomize(rng, { logic }) {
	const counts = {};
	const countsSorted = [];

	// get all actors that can hold a game item and sort in descending order
	const actors = itemActors();
	actors.forEach((a, index) => {
		a.index = index;

		// if we need to do randomization more than once, make sure to reset logic to original state
		if (a.originalRequirements) {
			a.requirements[logic] = a.originalRequirements;
		} else {
			a.originalRequirements = a.requirements[logic];
		}

		// get a rough count of how often an item is required for prioritization of placement
		a.requirements[logic].replace(/[()&|]/g, '').split(/\s+/).filter(r => r !== '').forEach(r => {
			const name = r.toLowerCase().replace(/_/g, ' ');
			counts[name] = !counts[name] ? 1 : counts[name] + 1;
		});
	});
	Object.keys(counts).forEach(key => countsSorted.push({ name: key, value: counts[key] }));
	const itemDeps = countsSorted.sort((a,b) => a.value < b.value).map(c => c.name);

	// Make a list of all items to be randomized. Whips are not specified by name
	// as they are updated progressively. Same goes for crystals, though they have
	// item dependencies, so their order and adherence to dependencies still needs to be
	// maintained to avoid potential soft locks.
	const itemList = [];
	items.forEach(item => {
		const count = item.count || 1;
		for (let i = 0; i < count; i++) {
			itemList.push(item.name);
		}
	});

	// attach an item randomly to an actor
	const itemKeys = [ 'HOLY_WATER', 'WHITE_CRYSTAL', 'BLUE_CRYSTAL', 'RED_CRYSTAL', 'OAK_STAKE', 'HEART',
		'LAURELS', 'GARLIC', 'NAIL', 'DIAMOND', 'MAGIC_CROSS', 'THORN_WHIP' ];
	const baseFuncs = {};
	itemKeys.forEach(ik => {
		baseFuncs[ik] = `base.${ik} = function ${ik}() { return true; };`;
	});

	function processItem(item, isDep) {
		const evalLogic = i => i.replace(/([A-Z_]+)/g, 'funcs.$1(clone())');
		const funcLogic = i => i.replace(/([A-Z_]+)/g, 'funcs.$1(i)');
		const itemToKey = i => i.toUpperCase().replace(/\s+/g, '_');
		const funcs = Object.assign({}, baseFuncs);
		funcs[itemToKey(item)] = `base.${itemToKey(item)} = function ${itemToKey(item)}() { return false; };`;

		// remove dependency from item list (yet to be placed items)
		const index = itemList.findIndex(i => i === item);
		itemList.splice(index, 1);

		// render all dynamically created logic functions before evaluating logic
		let funcCode = `
// generate logic functions with "visited" checks to prevent infinite loop
const base = {};
const items = [ 'HOLY_WATER', 'WHITE_CRYSTAL', 'BLUE_CRYSTAL', 'RED_CRYSTAL', 'OAK_STAKE', 'LAURELS', 'NAIL', 'HEART', 'GARLIC', 'DIAMOND', 'MAGIC_CROSS', 'THORN_WHIP' ];
const funcs = {};
items.forEach(item => {
	funcs[item] = function(v) {
		if (v[item]) { return false; }
		v[item] = true;
		return base[item](v);
	};
});

// execute logic check
const visited = { ${itemToKey(item)}: true };
const clone = () => Object.assign({}, visited);

// base logic functions
`;
		funcCode += Object.keys(funcs).reduce((a,c) => {
			return a + funcs[c] + '\n';
		}, '');

		// evaluate the logic of all available actors
		const choices = actors.filter(actor => {
			if (actor.newItem) { return false; }
			if (!isDep) { return true; }
			if (actor.requirements[logic] === '') { return true; }
			const script = new vm.Script(funcCode + evalLogic(actor.requirements[logic]));
			return script.runInNewContext();
		});

		// bail if we can't find an available actor
		if (!choices.length) {
			throw new Error(`cannot find free actor for ${item}`);
		}

		// choose a random actor in `choices` subset and assign the item to it
		const choiceIndex = randomInt(rng, 0, choices.length - 1);
		const choice = choices[choiceIndex];
		let reqs = choice.requirements[logic];
		choice.itemName = item;

		// remove chosen actor from list after processing
		const aIndex = actors.findIndex(a => a.index === choice.index);
		actors.splice(aIndex, 1);

		// Dyanmically create a logic function for the current item to be
		// used in logic evaluation for all following items.
		const key = itemToKey(item);
		const rx = new RegExp(key, 'g');
		const body = (reqs ? reqs.replace(rx, 'false') : 'true');
		baseFuncs[key] = `base.${key} = function ${key}(i) { return ${funcLogic(body)}; };`;
	}

	// Add items to actors based on dependencies, starting with progression items
	itemDeps.forEach(i => processItem(i, true));
	const listCopy = itemList.slice(0);
	listCopy.forEach(i => processItem(i));
}

// Write and re-route data that determines the sales icon and prices for all merchants
function modSaleData(pm) {

	// merchant sale data on bank 3 (copying the original data from unhacked ROM)
	const saleBank = bank[3];
	const file = path.join(__dirname, 'data', 'sale.txt');
	const mod = modData(pm.name, file, saleBank);
	const origMod = _.clone(mod);

	// Write new pointers for copied data, skipping laurel, garlic, and oak entries as
	// they will get custom handling later in the process. We also skip the unused entries
	// where laurels are 2000 hearts and silver knife, as no merchant sells it (at least not
	// until this rando!)
	[
		null, // laurels,
		null, // laurels (0x2000 entry)
		null, // garlic
		'holyWater',
		'dagger',
		null, // silver knife
		null, // oak stake
		'whiteCrystal',
		'thorn',
		'chain',
		'morningStar'
	].forEach(itemType => {
		if (itemType) {
			core.getActor({ itemType }).salePointer = mod.rom;
		}
		mod.rom += 3;
	});

	// change the original sales data pointers to our new ones
	const bytes = [ mod.ram & 0xFF, mod.ram >>> 8 ];
	pm.add(bytes, 0x1ECF5);
	pm.add(bytes, 0x1ED05);
	pm.add(bytes, 0x1ED17);

	// write new sale data for each individual merchant
	const saleValues = {};
	let saleOffset = mod.length;
	function addSaleData(itemType) {
		saleValues[itemType] = saleOffset.toString(16);
		const romLoc = saleBank.rom.start + saleBank.offset;
		pm.add([ 0, 0, 0 ], romLoc);
		core.getActor({ itemType }).salePointer = romLoc;
		saleBank.offset += 3;
		saleOffset += 3;
	}
	sharedItemTypes.forEach(addSaleData);

	// Hack in the code that lets us generate unique sales icons and prices for each
	// individual merchant. The unhacked ROM shares a single entry for all garlic, laurel,
	// and oak stake merchants.
	modSubroutine(pm.name, asmFile('saleId.asm'), saleBank, {
		exitOffset: 2,
		values: saleValues,
		invoke: {
			romLoc: 0x1ED46,
			padding: 7
		}
	});

	return origMod;
}

module.exports = {
	items,
	patch: async function(pm, opts) {
		const { rng } = opts;
		const orbValues = {};
		const whipMerchantValues = {};
		const merchantValues = {};
		const deathValues = {};
		const camillaValues = {};
		const textValues = {};

		// initialize items
		items.initItems(pm, rng);

		// randomize game items amongst all available actors. Retry if necessary.
		function wrapper() {
			try {
				randomize(rng, opts);
			} catch (err) {
				if (err.message.includes('cannot find free actor')) {
					wrapper();
				} else {
					throw err;
				}
			}
		}
		wrapper();

		// write all merchant sale icon and price data
		const saleLoc = modSaleData(pm);

		// re-write code that determines if a merchant is a whip merchant
		modSubroutine(pm.name, asmFile('merchantId.asm'), bank[3], {
			invoke: {
				romLoc: 0x1EDAE,
				padding: 1
			}
		});

		// Establish unique id for each check by ensuring the $7F is set BEFORE a
		// a check actually gives you an item. By default this is only the case
		// with sale merchants.
		const checkIdDir = path.join(__dirname, 'checkId');
		const checkIdFiles = await fs.readdir(checkIdDir);
		checkIdFiles.forEach(checkIdFile => {
			const mod = require(path.join(checkIdDir, checkIdFile));
			pm.add(assemble(mod.code), mod.rom);
		});

		// TODO: This is hard-coded to work AFTER modSaleData, need to make it dynamic
		// store crystal icons for dynamically loading for merchants
		const crystalIconsFile = path.join(__dirname, 'data', 'crystalIcons.txt');
		const crystalIconsLoc = modData(pm.name, crystalIconsFile, bank[3]);

		// dynamically load crystal icon for merchants based on currently owned crystal
		modSubroutine(pm.name, asmFile('merchantIcon.asm'), bank[3], {
			invoke: {
				romLoc: 0x1ECF4
			},
			values: {
				isChecked: memory.isChecked.ram.toString(16),
				crystalIcons: crystalIconsLoc.ram.toString(16),
				saleIcons: saleLoc.ram.toString(16)
			}
		});

		// dynamically load high byte of price for merchant sales
		modSubroutine(pm.name, asmFile('merchantPrice.asm'), bank[3], {
			invoke: [
				{ romLoc: 0x1ED04 },
				{ romLoc: 0x1ED16 }
			],
			values: {
				isChecked: memory.isChecked.ram.toString(16),
				saleTable: saleLoc.ram.toString(16)
			}
		});

		// Skip all the crystal, laurel, and garlic merchant checks. We re-route
		// all of those anyway.
		pm.add([ 0x90, 0x3C ], 0x1EDB4);

		// process all actors with an item
		const itemActors = core
			.filter(c => c.actors)
			.map(c => c.actors.filter(a => a.holdsItem))
			.filter(c => c.length > 0)
			.reduce((a,c) => a.concat(c), [])
			.filter(a => a.itemName);

		let spoiler = [ [ 'item', 'actor', 'location', 'entry room' ] ];
		log('', true);
		itemActors.forEach(actor => {
			let jsrBuf;
			const item = items.find(i => i.name === actor.itemName);

			// garlic and laurels subroutine needs to access the appropriate bank
			if ([ 'garlic', 'laurels' ].includes(item.name) || item.whip || item.crystal) {
				item.code = item.bankCode[actor.bank];
				item.codeBytes = assemble(item.code);
			}

			// change actor text to match new item
			if (item && item.text) { actor.text = item.text; }

			// Write new text pointers for each individual garlic/laurel/oak merchant
			if (sharedItemTypes.includes(actor.itemType)) {
				const textRomLoc = bank[3].rom.start + bank[3].offset;
				const textRamLoc = bank[3].ram.start + bank[3].offset;
				const lowByte = (textRamLoc & 0xFF).toString(16);
				const highByte = (textRamLoc >>> 8).toString(16);
				textValues[actor.itemType] = `
LDA #$${lowByte}
STA *$00
LDA #$${highByte}
STA *$01
`;
				const textBytes = textToBytes(actor.text);
				pm.add(textBytes, textRomLoc);
				bank[3].offset += textBytes.length;
			}

			// Death code
			if (actor.name === 'Death') {
				deathValues.itemCode = item.code;
			}

			// Death code
			else if (actor.name === 'Camilla') {
				camillaValues.itemCode = item.code;
			}

			// orb item assignment
			else if (actor.name === 'orb') {
				orbValues[actor.subtype] = item.code;
			}

			// whip merchant item assignment
			else if (actor.name === 'merchant') {
				if (actor.subtype === 'whip') {
					whipMerchantValues[actor.itemType] = item.code;
				} else {
					merchantValues[actor.itemType] = item.code;
				}
			}

			// process actors holding item code
			else if (actor.code && actor.bank != null) {
				let buf = Buffer.from(item.codeBytes);
				let diff = actor.code.length - item.codeBytes.length;

				// uh oh, too much item code for the given actor code space
				if (actor.code.length < item.codeBytes.length) {
					const jsrRamLoc = bank[actor.bank].ram.start + bank[actor.bank].offset;
					const jsrRomLoc = bank[actor.bank].rom.start + bank[actor.bank].offset;
					const lowByteRam = jsrRamLoc & 0xFF;
					const highByteRam = jsrRamLoc >>> 8;

					// Write a JSR operation to jump to an item processing subroutine. This is
					// only 3 bytes and should fit anywhere. Pad with NOPs if necessary to fill
					// any additional space.
					buf = Buffer.from([ 0x20, lowByteRam, highByteRam ]);
					diff = actor.code.length - buf.length;

					// pad with NOPs
					if (diff > 0) {
						buf = Buffer.concat([buf, Buffer.alloc(diff, 0xEA)]);
					// still can't fit the code? We got a problem...
					} else if (diff < 0) {
						throw new Error(JSON.stringify({
							message: 'still failed to write item code', item, actor
						}));
					}

					// Now we need to write the code actually contained in the new subroutine.
					const jsrCode = item.codeBytes.concat([ 0x60 ]);
					jsrBuf = Buffer.from(jsrCode);
					pm.add([...jsrBuf], jsrRomLoc);
					bank[actor.bank].offset += jsrCode.length;
				} else if (actor.code.length > item.codeBytes.length) {
					buf = Buffer.concat([buf, Buffer.alloc(diff, 0xEA)]);
				}

				// write new code to the actor ROM location
				pm.add([...buf], actor.code.loc.rom);
			}

			// specific handling for merchants that covers text, sales icons, and prices
			if (actor.name === 'merchant') {
				// handle text for merchant
				if (!item.crystal && !item.whip) {
					actor.text = `${item.name.replace(' ', '\n')}?`;
				}

				// handle price and sales icon
				// first byte is the icon, next 2 are the price (0x01 0x72 == 172)
				actor.sale = [ item.icon, Math.floor(item.price / 100), parseInt(item.price % 100) ];
				if (!actor.salePointer) {
					throw new Error(`merchant has no sale pointer\n${JSON.stringify(actor, null, 2)}`);
				}
				pm.add(actor.sale, actor.salePointer);
			}

			// write the actor's new text to the patch
			if (!actor.text || !actor.textPointer) {
				throw new Error(`no text or text pointer for actor\n${JSON.stringify(actor, null, 2)}`);
			}
			pm.add(textToBytes(actor.text), actor.textPointer);

			const entryRoom = core.find(loc => loc.name === actor.locationName).entryRoom || '';

			log(`${pad(item.name, 15)} | ${pad(actor.name + (actor.name === 'merchant' ? ' (' + item.price + ')' : ''), 15)} | ${actor.locationName}`, true);
			spoiler.push([ item.name, actor.name, actor.locationName, entryRoom ]);
		});

		// TODO: resolve this laziness
		global.spoiler = spoiler;

		const refuseText = modText(pm.name, 'nice try\nsimon', bank[3]);

		// new garlic/laurel/oak merchant text and refuse text for progressive items
		modSubroutine(pm.name, asmFile('textUnshare.asm'), bank[3], {
			exitOffset: 17,
			values: Object.assign({
				isChecked: memory.isChecked.ram.toString(16),
				refuseLowByte: (refuseText.ram & 0xFF).toString(16),
				refuseHighByte: (refuseText.ram >>> 8).toString(16),
			}, textValues),
			invoke: {
				romLoc: 0x1EEC6,
				padding: 1
			}
		});

		// Death code goes on bank 1
		modSubroutine(pm.name, asmFile('boss.asm'), bank[1], {
			values: deathValues,
			invoke: {
				romLoc: 0x47D7,
				bytes: [ 0xEA, 0xD0, 0x06 ]
			}
		});

		// Camilla code goes on bank 1
		modSubroutine(pm.name, asmFile('boss.asm'), bank[1], {
			values: camillaValues,
			invoke: {
				romLoc: 0x47CF,
				padding: 3
			}
		});

		// orb code goes on bank 1
		modSubroutine(pm.name, asmFile('orb-7F.asm'), bank[1], {
			invoke: {
				romLoc: 0x47A4
			}
		});

		modSubroutine(pm.name, asmFile('orb.asm'), bank[1], {
			values: orbValues,
			invoke: {
				romLoc: 0x47A7,
				padding: 1
			}
		});

		// whip merchant code goes on bank 3
		modSubroutine(pm.name, asmFile('merchantWhip.asm'), bank[3], {
			values: whipMerchantValues,
			invoke: {
				romLoc: 0x1EE04
			}
		});

		// all other merchant code goes on bank 3
		modSubroutine(pm.name, asmFile('merchant.asm'), bank[3], {
			exitOffset: 4,
			values: merchantValues,
			invoke: {
				romLoc: 0x1EDF4,
				padding: 4
			}
		});
	}
};
