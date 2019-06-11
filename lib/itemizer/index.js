const assemble = require('../6502assembler');
const fs = require('fs').promises;
const path = require('path');
const { textToBytes } = require('../utils');

const TEXT_CHOICE_ASM = path.join(__dirname, 'text-choice.asm');
const WHIP_ASM = path.join(__dirname, 'whip.asm');

// "value" property refers to the value set at 0x0434 (RAM) when you own a whip
const whips = [
  //{ name: 'leather whip', value: 0x00 },
  { name: 'thorn whip', value: 0x01 },
  { name: 'chain whip', value: 0x02 },
  { name: 'morning star', value: 0x03 },
  { name: 'flame whip', value: 0x04 }
];
whips.forEach(w => w.whip = true);

// "value" property refers to the value added to 0x004A (RAM) when you own a weapon
const weapons = [
  { name: 'dagger', value: 0x01 },
  { name: 'silver knife', value: 0x02 },
  { name: 'golden knife', value: 0x04 },
  { name: 'holy water', value: 0x08, progression: true },
  { name: 'diamond', value: 0x10 },
  { name: 'sacred flame', value: 0x20 },
  { name: 'oak stake', value: 0x40, progression: true, count: 5 }
];
weapons.forEach(w => w.weapon = true);

// "value" property refers to the value added to 0x0091 (RAM) when you own an item
const inventory = [
  { name: 'rib', value: 0x01, dracPart: true },
  { name: 'heart', value: 0x02, dracPart: true },
  { name: 'eyeball', value: 0x04, dracPart: true },
  { name: 'nail', value: 0x08, dracPart: true },
  { name: 'ring', value: 0x10, dracPart: true },
  { name: 'white crystal', value: 0x20, crystal: true },
  { name: 'blue crystal', value: 0x40, crystal: true },
  { name: 'red crystal', value: 0x60, crystal: true }
];
inventory.forEach(i => i.progression = true);

// "value" property refers to the value added to 0x0092 (RAM) when you own an item
const carry = [
  { name: 'silk bag', value: 0x01 },
  { name: 'magic cross', value: 0x02, progression: true },
  { name: 'laurels', value: 0x04, progression: true, count: 5 },     // number of laurels at 0x004C
  { name: 'garlic', value: 0x08, progression: true, count: 2 }       // number of garlic at 0x004D
];

function secretMerchant(obj, newObj) {
  let code;
  switch(newObj.type) {
    case 'whip':
      // INC $0434
      code = [ 0xEE, 0x34, 0x04, 0xEA, 0xEA, 0xEA ];
      break;
    case 'item':
      break;
    default:
      throw new Error(`invalid object type ${newObj.type}`);
  }
}

const itemizer = module.exports = async function itemizer(romBuffer, rng) {
  let buf;

  // write code for progressive whip upgrades
	buf = Buffer.from(assemble(await fs.readFile(WHIP_ASM, 'utf8'))); //0x9D90
	buf.copy(romBuffer, 0xDDA0);

  // pointer to whip progression refuse text
  buf = Buffer.from([ 0x42, 0x9D ]);
  buf.copy(romBuffer, 0xDD50);

  // whip progression refuse text
  buf = Buffer.from(textToBytes('you got\nyour whip,\nnow buzz\noff!'));
  buf.copy(romBuffer, 0xDD52);

  // jump to subroutine that handles text choices
	buf = Buffer.from([ 0x20, 0x00, 0x9D, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA, 0xEA ]);
	buf.copy(romBuffer, 0x1EEB4);

  // write code for determining which text to show for a given npc and state
	buf = Buffer.from(assemble(await fs.readFile(TEXT_CHOICE_ASM, 'utf8')));
	buf.copy(romBuffer, 0xDD10);
};

itemizer.items = whips.concat(weapons, inventory, carry);


// 07:EF03:A9 3C     LDA #$3C
//  07:EF05:85 7D     STA $007D = #$06
//  07:EF07:E6 7A     INC $007A = #$04