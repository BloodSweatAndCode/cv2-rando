const _ = require('lodash');
const assemble = require('./6502assembler');
const core = require('./core');
const crypto = require('crypto');
const fs = require('fs');

exports.getActor = function getActor(filter) {
  for (let i = 0; i < core.length; i++) {
    if (!core[i].actors) { continue; }
    for (let j = 0; j < core[i].actors.length; j++) {
      const actor = core[i].actors[j];
      if (_.some([actor], filter)) {
        return actor;
      }
    }
  }
}

// create a new subroutine and re-route existing code to it
exports.modSubroutine = function modSubroutine(romBuffer, asmFile, bank, opts = {}) {
  const { exitOffset, invoke, values } = opts;
  const subRomLoc = bank.rom.start + bank.offset;
  const subRamLoc = bank.ram.start + bank.offset;

  // assemble code from asm file, templating values if necessary
  let code = fs.readFileSync(asmFile, 'utf8');
  if (values) {
    code = _.template(code)(values);
  }
  let codeBytes = assemble(code);

  // if we need exit jumps, update the placeholders (JMP $9999) here 
  if (exitOffset) {
    const exitRam = subRamLoc + codeBytes.length - (exitOffset || 0);
    const highByte = (exitRam >>> 8).toString(16);
    const lowByte = (exitRam & 0xFF).toString(16);
    code = code.replace(/JMP \$9999/g, `JMP \$${highByte}${lowByte}`);
    codeBytes = assemble(code);
  }

  // write the new subroutine to the rom
  const codeBuf = Buffer.from(codeBytes);
  codeBuf.copy(romBuffer, subRomLoc);

  // re-route to the new subroutine
  if (invoke) {
    const { padding, romLoc } = invoke;
    const highByte = (subRamLoc >>> 8).toString(16);
    const lowByte = (subRamLoc & 0xFF).toString(16);

    let invokeBuf = Buffer.from([ 0x20, lowByte, highByte ]);
    if (padding) {
      invokeBuf = Buffer.concat(invokeBuf, Buffer.alloc(padding, 0xEA));
    }
    invokeBuf.copy(romBuffer, romLoc);
  }

  // update the bank offset
  bank.offset += codeBuf.length;

  return { ram: subRamLoc, rom: subRomLoc };
}

exports.randomString = function randomString(len) {
	len = len || 16;
	return crypto
		.randomBytes(Math.ceil((len * 3) / 4))
		.toString('base64') // convert to base64 format
		.slice(0, len) // return required number of characters
		.replace(/\+/g, '0') // replace '+' with '0'
		.replace(/\//g, '0'); // replace '/' with '0'
};

exports.randomInt = function randomInt(rng, min, max) {
	return Math.floor(rng() * (max - min + 1)) + min;
};

exports.textToBytes = function textToBytes(text) {
  return text.toUpperCase().split('').map(c => textMap[c]).concat(END_BYTE);
}

const END_BYTE = 0xFF;
const textMap = {
  'A': 0x01,
  'B': 0x02,
  'C': 0x03,
  'D': 0x04,
  'E': 0x05,
  'F': 0x06,
  'G': 0x07,
  'H': 0x08,
  'I': 0x09,
  'J': 0x0A,
  'K': 0x0B,
  'L': 0x0C,
  'M': 0x0D,
  'N': 0x0E,
  'O': 0x0F,
  'P': 0x10,
  'Q': 0x11,
  'R': 0x12,
  'S': 0x13,
  'T': 0x14,
  'U': 0x15,
  'V': 0x16,
  'W': 0x17,
  'X': 0x18,
  'Y': 0x19,
  'Z': 0x1A,
  '.': 0x1B,
  '\'': 0x1C,
  '^': 0x1D, // this is the cursor on purchase dialogs
	',': 0x1E,
	'!': 0x40,
  '-': 0x46,
	'?': 0x5D,
  '0': 0x36,
  '1': 0x37,
  '2': 0x38,
  '3': 0x39,
  '4': 0x3A,
  '5': 0x3B,
  '6': 0x3C,
  '7': 0x3D,
  '8': 0x3E,
  '9': 0x3F,
  '\n': 0xFE
};
