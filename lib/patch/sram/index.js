const bank = require('../../bank');
const path = require('path');
const { modSubroutine } = require('../../utils');

module.exports = {
	patch: function(pm) {
		modSubroutine(pm.name, path.join(__dirname, 'sram.asm'), bank[8], {
			invoke: {
				romLoc: 0x1C02B,
				padding: 2
			}
		});
	}
};