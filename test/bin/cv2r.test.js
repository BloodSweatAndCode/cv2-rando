const _ = require('lodash');
const assert = require('assert');
const core = require('../../lib/core');
const fs = require('fs');
const logic = require('../../config/logic');
const path = require('path');
const vm = require('vm');
const { promisify } = require('util');

const exec = promisify(require('child_process').exec);
const access = promisify(fs.access);

function randomString() {
	return Math
		.random()
		.toString(36)
		.substring(2, 15) + Math.random().toString(36)
		.substring(2, 15);
}

function logicByLocationAndType(location, name, logicType) {
	for (let i = 0; i < core.length; i++) {
		const loc = core[i];
		if (loc.name !== location) { continue; }
		return loc.actors.find(a => a.name === name).requirements[logicType];
	}
}

let useRom;
describe('bin/cv2r', async function() {

	before(async function() {
		try {
			await access('cv2.nes', fs.constants.F_OK);
			useRom = true;
		} catch (err) {
			useRom = false;
		}
	});

	describe('door-rando', async function() {
		for (let i = 0; i < 100; i++) {
			const seed = randomString();
			const filename = path.join(__dirname, 'tmp', `cv2-test-${seed}`);
			const bin = process.platform === 'win32' ? 'node --no-warnings .\\bin\\cv2r' : 'node --no-warnings ./bin/cv2r';
			const cmd = useRom ?
				`${bin} --seed ${seed} --patch door-rando --output "${filename}" cv2.nes` :
				`${bin} --seed ${seed} --patch door-rando --json`;

			it(`[${i + 1}] ${cmd}`, async function() {
				const { stdout } = await exec(cmd);
				const { doorSpoiler, patch } = JSON.parse(stdout);
				const spoiler = doorSpoiler.slice(1);
				const doorRom = spoiler.pop()[1];
				const doorTable = Object.values(patch.find(p => Object.keys(p)[0] === doorRom + ''))[0];

				// make sure all town doors are unique
				assert.equal(_.uniq(spoiler.map(a => a[0])).length, spoiler.length);

				// make sure all mansion doors are unique, subtract 3 from location count because there's 4 churches
				assert.equal(_.uniq(spoiler.map(a => a[1])).length, spoiler.length - 3);

				// ensure that the new locations in the spoiler actually match the data in the door table
				// in the the ROM patch
				spoiler.forEach(s => {
					const doorLoc = core.find(loc => {
						if (!loc.doors || !loc.doors.data) { return; }
						return loc.doors.data.find(d => d.name === s[0]);
					});
					const { pointerIndex, area: doorArea, objset: doorObjset } = doorLoc.doors.data.find(d => d.name === s[0]);
					const { objset, area } = core.find(loc => loc.name === s[1]);
					if (doorObjset === 1) {
						assert.equal(doorTable[(doorArea + 0x1C) * 2], objset);
						assert.equal(doorTable[(doorArea + 0x1C) * 2 + 1], area);
					} else {
						assert.equal(doorTable[pointerIndex * 2], objset);
						assert.equal(doorTable[pointerIndex * 2 + 1], area);
					}
				});
			});
		}
	});

	logic.forEach(lt => {
		for (let i = 0; i < 100; i++) {
			const logic = lt;
			const seed = randomString();
			const filename = path.join(__dirname, 'tmp', `cv2-test-${seed}`);
			const bin = process.platform === 'win32' ? 'node --no-warnings .\\bin\\cv2r' : 'node --no-warnings ./bin/cv2r';
			const cmd = useRom ? `${bin} --seed ${seed} --output "${filename}" --logic ${logic} cv2.nes` : `${bin} --seed ${seed} --logic ${logic} --json`;

			it(`[${i + 1}] ` + cmd, async function() {
				const gotItems = [];
				const { stdout } = await exec(cmd);
				const crystals = [ 'white crystal', 'blue crystal', 'red crystal' ];
				const { spoiler } = JSON.parse(stdout);
				const spoilerLength = spoiler.length - 1;
				let found;
				let crystalCount = 0;

				spoiler.forEach(s => s.push(logicByLocationAndType(s[2], s[1], logic)));
				do {
					found = false;
					const setVal = v => !!gotItems.includes(v);
					const sandbox = {
						HOLY_WATER: setVal('holy water'),
						WHITE_CRYSTAL: setVal('white crystal'),
						BLUE_CRYSTAL: setVal('blue crystal'),
						RED_CRYSTAL: setVal('red crystal'),
						OAK_STAKE: setVal('oak stake'),
						HEART: setVal('heart'),
						LAURELS: setVal('laurels'),
						GARLIC: setVal('garlic'),
						NAIL: setVal('nail'),
						DIAMOND: setVal('diamond'),
						MAGIC_CROSS: setVal('magic cross'),
						THORN_WHIP: setVal('thorn whip'),
						CHAIN_WHIP: setVal('chain whip'),
						MORNING_STAR: setVal('morning star')
					};
					for (let i = 1; i < spoiler.length; i++) {
						const script = new vm.Script(spoiler[i][4]);
						if (!spoiler[i][4] || script.runInNewContext(sandbox)) {
							const item = spoiler[i][0];
							found = true;
							if (item.includes('crystal')) {
								gotItems.push(crystals[crystalCount++]);
							} else {
								gotItems.push(item);
							}
							spoiler.splice(i, 1);
							i--;
						}
					}
				} while (found);

				assert.equal(gotItems.length, spoilerLength);
			});
		}
	});

});
