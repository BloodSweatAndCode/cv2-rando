const _ = require('lodash');
const assemble = require('./6502assembler');
const crypto = require('crypto');
const fs = require('fs');
const pm = require('./patch-manager');
const { yellow } = require('chalk');

// log debug info
exports.log = function log(msg) {
	if (global.debug) {
		console.log(msg);
	}
};

exports.printHeader = function printHeader(header) {
	exports.log('-'.repeat(header.length + 4));
	exports.log('| ' + yellow(header) + ' |');
	exports.log('-'.repeat(header.length + 4)); 
};

// suffix a string with additional padding
exports.pad = function pad(str, size, fill = ' ') {
	while (str.length < size) {
		str += fill;
	}
	return str;
};

// Write space-separated data bytes to the rom and update the bank offset. The
// location returned is prior to updating the offset.
exports.modData = function modData(patch, dataFile, bank) {
	const data = fs.readFileSync(dataFile, 'utf8');
	const bytes = data.split(/\s+/).map(h => parseInt(h, 16));
	const mod = {
		ram: bank.ram.start + bank.offset,
		rom: bank.rom.start + bank.offset,
		length: bytes.length
	};
	pm[patch].add(bytes, mod.rom);
	bank.offset += mod.length;
	return mod;
};

exports.modText = function modText(romBuffer, text, bank) {
	const bytes = exports.textToBytes(text);
	const buf = Buffer.from(bytes);
	const mod = {
		ram: bank.ram.start + bank.offset,
		rom: bank.rom.start + bank.offset,
		length: buf.length
	};
	buf.copy(romBuffer, mod.rom);
	bank.offset += mod.length;
	return mod;
};

function padHex(hex) {
	while (hex.length < 2) {
		hex = `0${hex}`;
	}
	return hex;
}
exports.padHex = padHex;

// Create a new subroutine, re-route existing code to it, and update the bank offset.
// The location returned is prior to updating the offset.
exports.modSubroutine = function modSubroutine(patch, asmFile, bank, opts = {}) {
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
		const highByte = padHex((exitRam >>> 8).toString(16));
		const lowByte = padHex((exitRam & 0xFF).toString(16));

		// Some subroutines end up too long for branch instructions, so we put
		// in a placeholder jump to the end of the subsroutine. This placeholder 
		// gets replaced with the appropriate RAM value;
		code = code.replace(/JMP \$9999/g, `JMP $${highByte}${lowByte}`);
		codeBytes = assemble(code);
	}

	// write the new subroutine to the rom
	pm[patch].add(codeBytes, subRomLoc);

	// re-route to the new subroutine
	if (invoke) {
		const { bytes, padding, romLoc } = invoke;
		const highByte = subRamLoc >>> 8;
		const lowByte = subRamLoc & 0xFF;
		let invokeBuf = Buffer.from([ 0x20, lowByte, highByte ]);
		if (bytes) {
			invokeBuf = Buffer.concat([ invokeBuf, Buffer.from(bytes) ]);
		}
		if (padding) {
			invokeBuf = Buffer.concat([invokeBuf, Buffer.alloc(padding, 0xEA)]);
		}
		pm[patch].add([...invokeBuf], romLoc);
	}

	// update the bank offset
	bank.offset += codeBytes.length;

	return { ram: subRamLoc, rom: subRomLoc, length: codeBytes.length };
};

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

exports.randomDecimal = function randomDecimal(rng, min, max) {
	return rng() * (max - min) + min;
};

const TEXT_MAP_INGAME = exports.TEXT_MAP_INGAME = 1;
const TEXT_MAP_TITLE = exports.TEXT_MAP_TITLE = 2;
exports.textToBytes = function textToBytes(text, mapId = TEXT_MAP_INGAME) {
	const bytes = text.toUpperCase().split('').map(c => textMap[mapId - 1][c]);
	if (mapId === TEXT_MAP_INGAME) {
		bytes.push(END_BYTE);
	}
	return bytes;
};

//Changed this to use the modified textToBytesTitle function
exports.textToHexString = function(text) {
	const bytes = exports.textToBytes(text, TEXT_MAP_TITLE);
	return bytes.map(t => padHex(t.toString(16).toUpperCase())).join(' ');
};

const END_BYTE = 0xFF;
const textMap = [
	// in-game text map
	{
		' ': 0x00,
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
		'^': 0x1D, // this is the cursor on merchant dialogs
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
	},

	// title screen text map
	{
		' ': 0xC1,
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
		'?': 0x1B,
		'\'': 0x1C,
		'.': 0x1D,
		',': 0x1E,
		'!': 0x20,
		'-': 0x46,
		'0': 0x36,
		'1': 0x37,
		'2': 0x38,
		'3': 0x39,
		'4': 0x3A,
		'5': 0x3B,
		'6': 0x3C,
		'7': 0x3D,
		'8': 0x3E,
		'9': 0x3F
	}
];
