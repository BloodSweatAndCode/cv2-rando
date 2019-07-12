const _ = require('lodash');
const assemble = require('../6502assembler');
const bank = require('../bank');
const core = require('../core');
const fs = require('fs').promises;
const items = require('./items');
const path = require('path');
const { randomInt, textToBytes } = require('../utils');

// return an array of all actors that can hold an item
function itemActors() {
  return core
    .filter(c => c.actors)
    .map(c => c.actors.filter(a => a.holdsItem))
    .filter(c => c.length > 0)
    .reduce((a,c) => a.concat(c), []);
}

function randomize(rng) {
  const counts = {};
  const countsSorted = [];

  // get all actors that can hold a game item and sort in descending order
  const actors = itemActors();
  actors.forEach((a, index) => {
    a.index = index;
    a.requirements.forEach(r => {
      if (!counts[r]) {
        counts[r] = 1;
      } else {
        counts[r]++;
      }
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
      //itemList.push(item.whip ? 'whip' : item.crystal ? 'crystal' : item.name);
      itemList.push(item.name);
    }
  });

  // attach an item randomly to an actor 
  function processItem(item, isDep) {
    
    // remove dependency from item list (yet to be placed items)
    //const key = /crystal/.test(item) ? 'crystal' : item;
    const key = item;
    const index = itemList.findIndex(i => i === key);
    itemList.splice(index, 1);

    // get all actors for which requirements are met and no item has been placed
    const choices = actors.filter(a => ((!a.requirements.includes(item) || !isDep) && !a.newItem));
    if (!choices.length) {
      throw new Error(`cannot find free actor for ${item}`); 
    }

    // choose a random actor in `choices` subset and assign the item to it
    const choiceIndex = randomInt(rng, 0, choices.length - 1);
    const choice = choices[choiceIndex];
    const reqs = choice.requirements;
    choice.itemName = key;

    // remove chosen actor from list after processing
    const aIndex = actors.findIndex(a => a.index === choice.index);
    actors.splice(aIndex, 1);

    // add the requirement(s) of the chosen actor to all other actors that have the
    // current item as a requirement. For example, if we assigned 'holy water' to an
    // actor that has 'garlic' as a requirement, we need to add 'garlic' as a 
    // requirement to all other actors that have 'holy water' as a requirement.
    isDep && actors.forEach(a => {
      if (a.requirements.includes(item)) {
        a.requirements = _.union(a.requirements, reqs);
      }
    });
  }

  // Add items to actors based on dependencies, starting with progression items
  itemDeps.forEach(i => processItem(i, true));
  const listCopy = itemList.slice(0);
  listCopy.forEach(i => processItem(i));
}

// TODO: write code to progressively change merchant icon for crystal purchases
const itemizer = module.exports = async function itemizer(romBuffer, rng) {
  const orbCode = await fs.readFile(path.join(__dirname, 'asm', 'orb.asm'), 'utf8');
  const orbValues = {};
  const whipMerchantCode = await fs.readFile(path.join(__dirname, 'asm', 'merchantWhip.asm'), 'utf8');
  const whipMerchantValues = {};
  const merchantCode = await fs.readFile(path.join(__dirname, 'asm', 'merchant.asm'), 'utf8');
  const merchantValues = {};

  // randomize game items amongst all available actors
  randomize(rng);

  // merchant sale data on bank 3 (copying the original data from unhacked ROM)
  const saleData = await fs.readFile(path.join(__dirname, 'asm', 'saleData.txt'), 'utf8');
  let saleBytes = saleData.split(/\s+/).map(h => parseInt(h, 16));
  let saleBuf = Buffer.from(saleBytes);
  saleBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);

  // change the original sales data pointer to our new one
  const saleDataRam = bank[3].ram.start + bank[3].offset;
  console.log({
    rom: (bank[3].rom.start + bank[3].offset).toString(16),
    ram: (bank[3].ram.start + bank[3].offset).toString(16)
  });
  const salePointerBuf = Buffer.from([ saleDataRam & 0xFF, saleDataRam >>> 8 ]);
  salePointerBuf.copy(romBuffer, 0x1ECF5);
  salePointerBuf.copy(romBuffer, 0x1ED05);
  salePointerBuf.copy(romBuffer, 0x1ED17);
  bank[3].offset += saleBuf.length;

  // write new sale data for each individual merchant
  const saleValues = {};
  let saleOffset = 33;

  saleValues['garlicAljiba'] = saleOffset.toString(16);
  saleBuf = Buffer.from([ 0x6D, 00, 0x50 ]);
  saleBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);
  bank[3].offset += 3;
  saleOffset += 3;

  saleValues['garlicAlba'] = saleOffset.toString(16);
  saleBuf = Buffer.from([ 0x6D, 00, 0x50 ]);
  saleBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);
  bank[3].offset += 3;
  saleOffset += 3;

  // hack in the code that lets us generating unique sales icons and prices for each
  // individual merchant. The unhacked ROM shares a single entry for all garlic, laurel,
  // and oak stake merchants.
  let saleCode = await fs.readFile(path.join(__dirname, 'asm', 'saleId.asm'), 'utf8');
  saleCode = _.template(saleCode)(saleValues);
  saleBytes = assemble(saleCode);
  const saleExitRam = bank[3].ram.start + bank[3].offset + saleBytes.length - 2;
  const saleHighByte = (saleExitRam >>> 8).toString(16);
  const saleLowByte = (saleExitRam & 0xFF).toString(16);
  saleCode = saleCode.replace(/JMP \$9999/g, `JMP \$${saleHighByte}${saleLowByte}`);
  const saleCodeBuf = Buffer.from(assemble(saleCode));
  saleCodeBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);
  const saleCodeRam = bank[3].ram.start + bank[3].offset;
  const saleInvokeBuf = Buffer.from([ 0x20, saleCodeRam & 0xFF, saleCodeRam >>> 8, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA ]);
  saleInvokeBuf.copy(romBuffer, 0x1ED46);
  bank[3].offset += saleCodeBuf.length;

  // process all actors with an item
  const itemActors = core
    .filter(c => c.actors)
    .map(c => c.actors.filter(a => a.holdsItem))
    .filter(c => c.length > 0)
    .reduce((a,c) => a.concat(c), [])
    .filter(a => a.itemName);

  itemActors.forEach(actor => {
    const item = items.find(i => i.name === actor.itemName);
    let buf = Buffer.from(item.codeBytes);
    let jsrBuf;
    
    // change actor text to match new item
    if (item && item.text) { actor.text = item.text; }

    // orb item assignment
    if (actor.name === 'orb') {
      orbValues[actor.subtype] = item.code;
      console.log(`Put ${item.name} in ${actor.name} at ${actor.locationName}`);
    }

    // whip merchant item assignment
    else if (actor.name === 'merchant') {
      if (actor.subtype === 'whip') {
        whipMerchantValues[actor.itemType] = item.code;
      } else {
        merchantValues[actor.itemType] = item.code;
      }
      console.log(`Put ${item.name} in ${actor.name} at ${actor.locationName}`);
    }

    // process actors holding item code
    else if (actor.code && actor.bank != null) {
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
        //console.log({ jsrRamLoc, lowByteRam, highByteRam });
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
        jsrBuf.copy(romBuffer, jsrRomLoc);
        bank[actor.bank].offset += jsrCode.length;
      } else if (actor.code.length > item.codeBytes.length) {
        buf = Buffer.concat([buf, Buffer.alloc(diff, 0xEA)]);
      }

      // write new code to the actor ROM location
      buf.copy(romBuffer, actor.code.loc.rom);

      console.log(`***** Put ${item.name} in ${actor.name} at ${actor.locationName}`);
    }

    // execute actor-specific ROM hacking (for example, merchant sale icons)
    actor.hack && actor.hack(romBuffer, item, bank[3]);
  });

  // orb code goes on bank 1
  const orbCodeCompiled = _.template(orbCode)(orbValues);
  const orbCodeBuf = Buffer.from(assemble(orbCodeCompiled));
  orbCodeBuf.copy(romBuffer, bank[1].rom.start + bank[1].offset);
  const orbCodeRam = bank[1].ram.start + bank[1].offset;
  const orbInvokeBuf = Buffer.from([ 0x20, orbCodeRam & 0xFF, orbCodeRam >>> 8, 0xEA ]);
  orbInvokeBuf.copy(romBuffer, 0x47A7);
  bank[1].offset += orbCodeBuf.length;

  // whip merchant code goes on bank 3
  const whipMerchantCodeCompiled = _.template(whipMerchantCode)(whipMerchantValues);
  const whipMerchantCodeBuf = Buffer.from(assemble(whipMerchantCodeCompiled));
  whipMerchantCodeBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);
  const whipMerchantCodeRam = bank[3].ram.start + bank[3].offset;
  const whipMerchantInvokeBuf = Buffer.from([ 0x20, whipMerchantCodeRam & 0xFF, whipMerchantCodeRam >>> 8 ]);
  whipMerchantInvokeBuf.copy(romBuffer, 0x1EE04);
  bank[3].offset += whipMerchantCodeBuf.length;

  // merchant code goes on bank 3
  let merchantCodeCompiled = _.template(merchantCode)(merchantValues);
  let merchantCodeAssembled = assemble(merchantCodeCompiled);

  // merchant code is a long subroutine, so depending on what item code goes within it,
  // it may be too large for branch instructions with only have a range of +/- 127 bytes.
  // For this reason I use a JMP placeholder ($9999), assemble the code, determine the
  // full byte length, then change the placeholders JMP calls to point to the RAM at the
  // end of the subroutine with direct addressing.
  const exitCodeRam = bank[3].ram.start + bank[3].offset + merchantCodeAssembled.length - 4;
  const exitHighByte = (exitCodeRam >>> 8).toString(16);
  const exitLowByte = (exitCodeRam & 0xFF).toString(16);
  merchantCodeCompiled = merchantCodeCompiled
    .replace(/JMP \$9999/g, `JMP \$${exitHighByte}${exitLowByte}`);
  merchantCodeAssembled = assemble(merchantCodeCompiled);
  const merchantCodeBuf = Buffer.from(merchantCodeAssembled);
  merchantCodeBuf.copy(romBuffer, bank[3].rom.start + bank[3].offset);
  const merchantCodeRam = bank[3].ram.start + bank[3].offset;
  const merchantInvokeBuf = Buffer.from([ 0x20, merchantCodeRam & 0xFF, merchantCodeRam >>> 8, 0xEA, 0xEA, 0xEA, 0xEA ]);
  merchantInvokeBuf.copy(romBuffer, 0x1EDF4);
  bank[3].offset += merchantCodeBuf.length;

  // garlic merchant sales data



  //console.log(itemActors);

  // const TEXT_CHOICE_ASM = path.join(__dirname, 'asm', 'text-choice.asm');
  // const WHIP_ASM = path.join(__dirname, 'asm', 'whip.asm');

//   // write code for progressive whip upgrades
// 	buf = Buffer.from(assemble(await fs.readFile(WHIP_ASM, 'utf8'))); //0x9D90
// 	buf.copy(romBuffer, 0xDDA0);

//   // pointer to whip progression refuse text
//   buf = Buffer.from([ 0x42, 0x9D ]);
//   buf.copy(romBuffer, 0xDD50);

//   // whip progression refuse text
//   buf = Buffer.from(textToBytes('you got\nyour whip,\nnow buzz\noff!'));
//  // buf = Buffer.from(textToBytes('you got\nyour whip,\nnow buzz\noff!'));
//   buf.copy(romBuffer, 0xDD52);

//   // jump to subroutine that handles text choices
// 	buf = Buffer.from([ 0x20, 0x00, 0x9D, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA ]);
// 	buf.copy(romBuffer, 0x1EEB4);

//   // write code for determining which text to show for a given npc and state
// 	buf = Buffer.from(assemble(await fs.readFile(TEXT_CHOICE_ASM, 'utf8')));
// 	buf.copy(romBuffer, 0xDD10);
};

itemizer.items = items;


// 07:EF03:A9 3C     LDA #$3C
//  07:EF05:85 7D     STA $007D = #$06
//  07:EF07:E6 7A     INC $007A = #$04