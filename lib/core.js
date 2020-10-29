const _ = require('lodash');
const { enemy, fixture, npc } = require('./object');

const core = [
	{
		name: 'Jova',
		objset: 0,
		area: 0,
		submap: 0,
		doors: {
			requirements: {
				beginner:'',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: '',
				morningStar: '',
			},
			data: [
				{
					name: 'Jova - Thorn Whip Door',
					objset: 0,
					area: 0,
					submap: 0,
					pointerIndex: 1,
					target: {
						objset: 0,
						area: 0x08
					}
				},
				{
					name: 'Jova - Church Door',
					objset: 0,
					area: 0,
					submap: 0,
					pointerIndex: 2,
					target: {
						objset: 0,
						area: 0x07
					}
				},
				{
					name: 'Jova - Holy Water Door',
					objset: 0,
					area: 0,
					submap: 0,
					pointerIndex: 3,
					target: {
						objset: 0,
						area: 0x09
					}
				}
			]
		},
		actors: [
			npc.shepherd(0x04, 0x0C, 0x38, 0x50BC, {
				text: 'first thing\nto do in\nthis town is\nbuy a white\ncrystal.',
				textPointer: 0xD2CF // 0x92BF
			}),
			npc.shepherd(0x04, 0x1A, 0x3D, 0x50C0, {
				text: 'you have a\nfriend in\nthe town of\naldra. go and\nsee him.',
				textPointer: 0xD3E7
			}),
			npc.shepherd(0x08, 0x12, 0x3E, 0x50C4, {
				text: '13 clues\nwill solve\ndracula\'s\nriddle.',
				textPointer: 0xD41F
			}),
			fixture.sign(0x0C, 0x1A, 0x3A, 0x50C8, {
				text: 'turn right\nfor the jova\nwoods. left\nfor belasco\nmarsh.',
				textPointer: 0xD343
			}),
			enemy.zombie(0x0C, 0x0C, 0x01, 0x50CC),
			npc.shepherd(0x14, 0x1A, 0x41, 0x50D0, {
				text: 'a magic\npotion will\ndestroy the\nwall of\nevil.',
				textPointer: 0xD498
			}),
			enemy.zombie(0x14, 0x14, 0x01, 0x50D4),
			npc.man(0x18, 0x14, 0x44, 0x50D8, {
				text: 'rumor has it\n, the ferry\nman at dead\nriver loves\ngarlic.',
				textPointer: 0xD526
			}),
			enemy.zombie(0x18, 0x0C, 0x01, 0x50DC),
			enemy.zombie(0x1C, 0x1A, 0x01, 0x50E0),
			npc.shepherd(0x24, 0x0C, 0x4C, 0x50E4, {
				text: 'a crooked\ntrader is\noffering bum\ndeals in\nthis town.',
				textPointer: 0xD67B
			}),
			npc.man(0x28, 0x14, 0x4D, 0x50E8, {
				text: 'a flame is\non top of\nthe 6th tree\nin denis\nwoods.',
				textPointer: 0xD6B0
			}),
			npc.man(0x2C, 0x1A, 0x4E, 0x50EC, {
				text: 'clues to\ndracula\'s\nriddle are\nin the town\nof veros.',
				textPointer: 0xD6E2
			}),
			enemy.zombie(0x28, 0x14, 0x01, 0x50F0),
			enemy.zombie(0x2C, 0x0C, 0x01, 0x50F4),
			npc.merchant(0x34, 0x12, 0x07, 0x50F8, {
				itemType: 'whiteCrystal',
				text: 'buy a white\ncrystal?',
				textPointer: 0xD24A,
				actorRequirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar:'',
				},
				requirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar:'',
				}
			}),
			enemy.zombie(0x34, 0x12, 0x01, 0x50FC),
			enemy.zombie(0x38, 0x0C, 0x01, 0x5100)
		]
	},
	{
		name: 'Veros',
		objset: 0,
		area: 0x01,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
			},
			data: [
				{
					name: 'Veros - Dagger Door',
					objset: 0,
					area: 0x01,
					submap: 0,
					pointerIndex: 4,
					target: {
						objset: 0,
						area: 0x0A
					}
				},
				{
					name: 'Veros - Church Door',
					objset: 0,
					area: 0x01,
					submap: 0,
					pointerIndex: 5,
					target: {
						objset: 0,
						area: 0x07
					}
				},
				{
					name: 'Veros - Chain Whip Door',
					objset: 0,
					area: 0x01,
					submap: 0,
					pointerIndex: 7,
					target: {
						objset: 0,
						area: 0x0B
					}
				},
			]
		},
		actors: [
			npc.man(0x04, 0x0C, 0x40, 0x522A, {
				text: 'a rib can\nshield you\nfrom evil.',
				textPointer: 0xD478
			}),
			enemy.bat(0x04, 0x08, 0x02, 0x522E, { ground: 0x0C }),
			npc.man(0x0C, 0x0C, 0x43, 0x5232, {
				text: 'laurels in\nyour soup\nenhances its\naroma.',
				textPointer: 0xD4FD
			}),
			fixture.sign(0x0D, 0x0C, 0x3B, 0x5036, {
				text: 'turn right\nfor dabi\'s\npath left\nfor the\nveros woods.',
				textPointer: 0xD37A
			}),
			npc.man(0x14, 0x0C, 0x48, 0x523A, {
				text: 'you look\npale,my son.\nyou must\nrest in the\nchurch.',
				textPointer: 0xD5D4
			}),
			npc.woman(0x1A, 0x0C, 0x4F, 0x523E, {
				text: 'clues to\ndracula\'s\nriddle are\nin the town\nof alba.',
				textPointer: 0xD716
			}),
			enemy.zombie(0x18, 0x0C, 0x02, 0x5242),
			npc.shepherd(0x1C, 0x0C, 0x50, 0x5246, {
				text: 'clues to\ndracula\'s\nriddle are\nin berkeley\nmansion.',
				textPointer: 0xD749
			}),
			npc.shepherd(0x24, 0x0C, 0x39, 0x524A, {
				text: 'you\'ve got a\nfriend wait\ning for you\nin the town\nof aljiba.',
				textPointer: 0xD306
			}),
			enemy.zombie(0x28, 0x0C, 0x02, 0x524E),
			enemy.zombie(0x2C, 0x0C, 0x02, 0x5252),
			enemy.zombie(0x34, 0x08, 0x02, 0x5256),
			enemy.bat(0x34, 0x0C, 0x02, 0x525A, { ground: 0x0C })
		]
	},
	{
		name: 'Aljiba',
		objset: 0,
		area: 0x02,
		submap: 0,
		doors: {
			requirements: {
				beginner:'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
			},
			data: [
				{
					name: 'Ajiba - Garlic Door',
					objset: 0,
					area: 0x02,
					submap: 0,
					pointerIndex: 8,
					target: {
						objset: 0,
						area: 0x0C
					}
				},
				{
					name: 'Aljiba - Book & Old Lady Door',
					objset: 0,
					area: 0x02,
					submap: 0,
					pointerIndex: 9,
					target: {
						objset: 0,
						area: 0x0D
					}
				},
				{
					name: 'Aljiba - Laurels Door',
					objset: 0,
					area: 0x02,
					submap: 0,
					pointerIndex: 0x0B,
					target: {
						objset: 0,
						area: 0x0E
					}
				},
			]
		},
		actors: [
			npc.crystalDude(0x08, 0x0C, 0x03, 0x517C, {
				bank: 1,
				text: 'i\'d like to\nexchange a\nwhite\ncrystal for\na blue one.',
				textPointer: 0xD85E,
				code: {
					loc: {
						rom: 0x507F + 8,
						ram: 0x906F + 8
					},
					length: 16
				},
				actorRequirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar:'',
				},
				requirements: {
					beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				},
				'7F': 0x55 // 0x6B on reject
				// 907F RAM, 508F ROM for blue crystal check code
			}),
			enemy.zombie(0x08, 0x0C, 0x02, 0x5180),
			npc.man(0x0C, 0x0C, 0x57, 0x5184, {
				text: 'to restore\nyour life,\nshout in\nfront of\nthe church.',
				textPointer: 0xD8C6
			}),
			fixture.sign(0x0C, 0x1A, 0x51, 0x5188, {
				text: 'turn right\nfor camilla\ncemetery,\nleft for the\naljiba woods.',
				textPointer: 0xD77C
			}),
			enemy.zombie(0x14, 0x0C, 0x02, 0x518C),
			npc.woman(0x18, 0x0C, 0x58, 0x5190, {
				text: 'the dead\nriver waits\nto be freed\nfrom the\ncurse.',
				textPointer: 0xD8FA
			}),
			npc.shepherd(0x1C, 0x0C, 0x5B, 0x5194, {
				text: 'a laurel \nwill protect\nyou from the\npoison\nmarsh.',
				textPointer: 0xD96B
			}),
			enemy.zombie(0x24, 0x1A, 0x05, 0x5198),
			npc.man(0x28, 0x1A, 0x60, 0x519C, {
				text: 'buy some\ngarlic.\nit has\nspecial\npowers.',
				textPointer: 0xDA5C
			}),
			enemy.zombie(0x2C, 0x0C, 0x02, 0x51A0),
			npc.shepherd(0x34, 0x0C, 0x69, 0x51A4, {
				text: 'clues to\ndracula\'s\nriddle are\nin rover\nmansion.',
				textPointer: 0xDBD7
			}),
			npc.man(0x34, 0x12, 0x67, 0x51A8, {
				text: 'clues to\ndracula\'s\nriddle are\nin the veros\nwoods.',
				textPointer: 0xDB74
			}),
			enemy.zombie(0x38, 0x0C, 0x02, 0x51AC)
		]
	},
	{
		name: 'Alba',
		objset: 0,
		area: 0x03,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
			},
			data: [
				{
					name: 'Alba - Laurels Door',
					objset: 0,
					area: 0x03,
					submap: 0,
					pointerIndex: 0x0F,
					target: {
						objset: 0,
						area: 0x10
					}
				},
				{
					name: 'Alba - Church Door',
					objset: 0,
					area: 0x03,
					submap: 0,
					pointerIndex: 0x0E,
					target: {
						objset: 0,
						area: 0x07
					}
				},
				{
					name: 'Alba - Garlic Door',
					objset: 0,
					area: 0x03,
					submap: 0,
					pointerIndex: 0x0D,
					target: {
						objset: 0,
						area: 0x0F
					}
				},
			]
		},
		actors: [
			npc.woman(0x08, 0x0C, 0x5F, 0x5105, {
				text: 'sorry, pal.\nno time now,\nmaybe\nlater.',
				textPointer: 0xDA36
			}),
			npc.woman(0x08, 0x1A, 0x61, 0x5109, {
				text: 'i\'ve been\nwaiting for\na good\nlooking guy\nlike you.',
				textPointer: 0xDA84
			}),
			npc.woman(0x0C, 0x20, 0x62, 0x510D, {
				text: 'i want to\nget to know\nyou better.',
				textPointer: 0xDAB7
			}),
			fixture.sign(0x0C, 0x28, 0x52, 0x5111, {
				text: 'turn right\nfor the dead\nriver, left\nfor the \nsadam woods.',
				textPointer: 0xD7B8
			}),
			enemy.zombie(0x0C, 0x0C, 0x04, 0x5115),
			npc.woman(0x14, 0x0C, 0x63, 0x5119, {
				text: 'i\'ll see\nyou at\nmidnight\non the\nriver bank.',
				textPointer: 0xDAD9
			}),
			enemy.zombie(0x14, 0x0C, 0x04, 0x511D),
			enemy.zombie(0x14, 0x1A, 0x04, 0x5121),
			npc.woman(0x18, 0x1A, 0x66, 0x5125, {
				text: 'get a silk\nbag from the\ngraveyard\nduck to live\nlonger.',
				textPointer: 0xDB3D
			}),
			enemy.zombie(0x1C, 0x28, 0x04, 0x5129),
			npc.woman(0x24, 0x0C, 0x5D, 0x512D, {
				text: 'hit deborah\ncliff with\nyour head to\nmake a hole.',
				textPointer: 0xD9D7
			}),
			enemy.zombie(0x28, 0x1A, 0x04, 0x5131),
			npc.crystalDude(0x2C, 0x22, 0x04, 0x5135, {
				bank: 1,
				text: 'i\'d like to\nexchange a\nblue crystal\nfor a red\none.',
				textPointer: 0xD893,
				code: {
					loc: {
						rom: 0x5098 + 4,
						ram: 0x9088 + 4
					},
					length: 11
				},
				actorRequirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar:'',
				},
				requirements: {
					beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.zombie(0x2C, 0x0C, 0x04, 0x5139),
			enemy.zombie(0x2C, 0x22, 0x04, 0x513D),
			enemy.zombie(0x2C, 0x28, 0x04, 0x5141),
			enemy.zombie(0x34, 0x0C, 0x04, 0x5145),
			npc.woman(0x38, 0x0C, 0x68, 0x5149, {
				text: 'clues to\ndracula\'s\nriddle are\nin bodley\nmansion.',
				textPointer: 0xDBA6
			})
		]
	},
	{
		name: 'Ondol',
		objset: 0,
		area: 0x04,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'

			},
			data: [
				{
					name: 'Ondol - Morning Star Door',
					objset: 0,
					area: 0x04,
					submap: 0,
					pointerIndex: 0x11,
					target: {
						objset: 0,
						area: 0x11
					}
				},
				{
					name: 'Ondol - Death Star Lady Door',
					objset: 0,
					area: 0x04,
					submap: 0,
					pointerIndex: 0x12,
					target: {
						objset: 0,
						area: 0x12
					}
				},
				{
					name: 'Ondol - Laurels Door',
					objset: 0,
					area: 0x04,
					submap: 0,
					pointerIndex: 0x13,
					target: {
						objset: 0,
						area: 0x13
					}
				},
			]
		},
		actors: [
			npc.shepherd(0x08, 0x0C, 0x3F, 0x525F, {
				text: 'a man living\nin darkness\ncan give\nyour whip\npower.',
				textPointer: 0xD445
			}),
			fixture.sign(0x0C, 0x28, 0x3C, 0x5263, {
				text: 'turn right\nfor sadam\nwoods, left\nfor the jam\nwasteland.',
				textPointer: 0xD3AF
			}),
			enemy.zombie(0x0C, 0x0C, 0x04, 0x5267),
			npc.man(0x14, 0x0C, 0x45, 0x526B, {
				text: 'dig up the\n4th grave in\nthe cemetery\nfor a\ndiamond.',
				textPointer: 0xD560
			}),
			npc.man(0x14, 0x1A, 0x46, 0x526F, {
				text: 'believe in\nmagic and\nyou\'ll be\nsaved.',
				textPointer: 0xD594
			}),
			enemy.zombie(0x18, 0x0C, 0x04, 0x5273),
			enemy.zombie(0x18, 0x18, 0x04, 0x5277),
			enemy.zombie(0x1C, 0x28, 0x04, 0x527B),
			enemy.zombie(0x24, 0x0C, 0x04, 0x527F),
			enemy.zombie(0x24, 0x14, 0x04, 0x5283),
			npc.shepherd(0x28, 0x14, 0x47, 0x5287, {
				text: 'take my\ndaughter,\nplease!',
				textPointer: 0xD5BA
			}),
			npc.shepherd(0x28, 0x24, 0x4A, 0x528B, {
				text: 'don\'t make\nme stay.\ni\'ll die.',
				textPointer: 0xD638
			}),
			enemy.zombie(0x2C, 0x1A, 0x04, 0x528F),
			npc.shepherd(0x34, 0x0C, 0x4B, 0x5293, {
				text: 'when i was\nyour age,\nwomen loved\nme.',
				textPointer: 0xD656
			}),
			enemy.zombie(0x34, 0x12, 0x04, 0x5297),
			enemy.zombie(0x38, 0x0C, 0x04, 0x529B),
			enemy.zombie(0x38, 0x1A, 0x04, 0x529F)
		]
	},
	{
		name: 'Doina',
		objset: 0,
		area: 0x05,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP && BLUE_CRYSTAL && RED_CRYSTAL',
				standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				glitch: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS',
				diamondWarp: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS)',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
			},
			data: [
				{
					name: 'Doina - GET BACK! Lady Door',
					objset: 0,
					area: 0x05,
					submap: 0,
					pointerIndex: 0x14,
					target: {
						objset: 0,
						area: 0x14
					}
				},
				{
					name: 'Doina - Church Door',
					objset: 0,
					area: 0x05,
					submap: 0,
					pointerIndex: 0x16,
					target: {
						objset: 0,
						area: 0x07
					}
				},
				{
					name: 'Doina - Laurels Door',
					objset: 0,
					area: 0x05,
					submap: 0,
					pointerIndex: 0x17,
					target: {
						objset: 0,
						area: 0x15
					}
				},
			]
		},
		actors: [
			npc.shepherd(0x04, 0x0C, 0x5E, 0x51B1, {
				text: 'after\ncastlevania\ni warned you\nnot to\nreturn.',
				textPointer: 0xDA08
			}),
			fixture.sign(0x0C, 0x0C, 0x53, 0x51B5, {
				text: 'turn left\nfor the\nwicked ditch\n, right to\ngo north.',
				textPointer: 0xD7F2
			}),
			enemy.zombie(0x14, 0x0C, 0x08, 0x51B9),
			npc.shepherd(0x1C, 0x06, 0x65, 0x51BD, {
				text: 'you\'ve\nupset the\npeople.\nnow get out\nof town!',
				textPointer: 0xDB0F
			}),
			enemy.zombie(0x1C, 0x0C, 0x08, 0x51C1),
			enemy.zombie(0x24, 0x0C, 0x08, 0x51C5),
			npc.shepherd(0x28, 0x0C, 0x6A, 0x51C9, {
				text: 'the cross in\nlaruba\'s \nmansion must\nbe found.',
				textPointer: 0xDC07
			}),
			enemy.zombie(0x2C, 0x0C, 0x08, 0x51CD),
			enemy.zombie(0x34, 0x0C, 0x08, 0x51D1)
		]
	},
	{
		name: 'Yomi',
		objset: 0,
		area: 0x06,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER && THORN_WHIP',
				standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				glitch: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS',
				diamondWarp: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS)',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
			},
			data: [
				{
					name: 'Yomi - Girlfriend Door',
					objset: 0,
					area: 0x06,
					submap: 0,
					pointerIndex: 0x1B,
					target: {
						objset: 0,
						area: 0x17
					}
				},
				{
					name: 'Yomi - Empty Room Door',
					objset: 0,
					area: 0x06,
					submap: 0,
					pointerIndex: 0x18,
					target: {
						objset: 0,
						area: 0x16
					}
				}
			]
		},
		actors: [
			fixture.sign(0x0C, 0x0C, 0x54, 0x51D6, {
				text: 'turn right\nfor vrad\ngraveyard,\nleft for the\ndora woods.',
				textPointer: 0xD826
			}),
			enemy.bat(0x14, 0x0C, 0x08, 0x51DA, { ground: 0x0C }),
			enemy.bat(0x18, 0x06, 0x08, 0x51DE, { ground: 0x06 }),
			enemy.bat(0x24, 0x0C, 0x08, 0x51E2, { ground: 0x0C }),
			enemy.bat(0x2C, 0x0C, 0x08, 0x51E6, { ground: 0x0C }),
			enemy.bat(0x38, 0x0C, 0x08, 0x51EA, { ground: 0x0C })
		]
	},
	{
		name: 'Church',
		objset: 0,
		area: 0x07,
		submap: 0,
		actors: [
			npc.priest(0x08, 0x08, 0x31, 0x4EED, {
				text: 'rest here\nfor a while.',
				textPointer: 0xD233
			})
		],
		ceiling: true
	},
	{
		name: 'Jova - Thorn Whip Room',
		objset: 0,
		area: 0x08,
		submap: 0,
		actors: [
			npc.merchant(0x0C, 0x0C, 0x08, 0x514E, {
				subtype: 'whip',
				itemType: 'thorn',
				text: 'buy a thorn\nwhip?',
				textPointer: 0xD25F,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: ''
				},
				requirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: ''
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Jova - Holy Water Room',
		objset: 0,
		area: 0x09,
		submap: 0,
		actors: [
			npc.merchant(0x0C, 0x0C, 0x03, 0x5153, {
				itemType: 'holyWater',
				text: 'want to buy\nholy water?',
				textPointer: 0xD2B7,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Veros - Empty Room Before Dagger',
		objset: 0,
		area: 0x0A,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Veros - Dagger Room',
		objset: 0,
		area: 0x0A,
		submap: 0x01,
		entryRoom: 'Veros - Empty Room Before Dagger',
		actors: [
			npc.merchant(0x0C, 0x0C, 0x04, 0x52A5, {
				itemType: 'dagger',
				text: 'will you buy\na dagger?',
				textPointer: 0xD2A0,
				actorRequirements: {
					beginner: '(HOLY_WATER || NAIL)',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: '(HOLY_WATER || NAIL)',
					morningStar: '(HOLY_WATER || NAIL)'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Veros - Chain Whip Room',
		objset: 0,
		area: 0x0B,
		submap: 0,
		actors: [
			npc.merchant(0x0A, 0x1A, 0x09, 0x52AA, {
				subtype: 'whip',
				itemType: 'chain',
				text: 'purchase a\nchain whip?',
				textPointer: 0xD271,
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER'

				}
			}),
			fixture.book(0x0D, 0x17, 0x42, 0x52AE, {
				text: 'clear a path\nat berkeley\nmansion with\na white\ncrystal.',
				textPointer: 0xD4C6,
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER',
				},
				'7F': 0x42
			})
		],
		ceiling: true
	},
	{
		name: 'Aljiba - Garlic Room',
		objset: 0,
		area: 0x0C,
		submap: 0,
		actors: [
			npc.merchant(0x0C, 0x1A, 0x02, 0x51EF, {
				itemType: 'garlicAljiba',
				text: 'will you buy\nsome garlic?',
				textPointer: 0xD201,
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && WHITE_CRYSTAL && THORN_WHIP',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Aljiba - Book Room Before Old Lady',
		objset: 0,
		area: 0x0D,
		submap: 0,
		actors: [
			fixture.book(0x03, 0x15, 0x5C, 0x51F4, {
				text: 'an old gypsy\nholds a\ndiamond in\nfront of deb\norah cliff.',
				textPointer: 0xD99D,
				actorRequirements: {
					beginner: '(HOLY_WATER || EYEBALL)',
					standard: '(HOLY_WATER || EYEBALL)',
					glitch: '(HOLY_WATER || EYEBALL)',
					diamondWarp: '(HOLY_WATER || EYEBALL)',
					redCrystal: '(HOLY_WATER || EYEBALL)',
					morningStar: '(HOLY_WATER || EYEBALL)'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || EYEBALL)',
					glitch: '(HOLY_WATER || EYEBALL)',
					diamondWarp: '(HOLY_WATER || EYEBALL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Aljiba - Old Lady Room',
		objset: 0,
		area: 0x0D,
		submap: 0x01,
		entryRoom: 'Aljiba - Book Room Before Old Lady',
		actors: [
			npc.oldLady(0x0C, 0x1A, 0x59, 0x51F9, {
				text: 'dracula\'s\neyeball\nreflects\nthe curse.',
				textPointer: 0xD92B
			})
		],
		ceiling: true
	},
	{
		name: 'Aljiba - Empty Room Before Laurels',
		objset: 0,
		area: 0x0E,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Aljiba - Laurels Room',
		objset: 0,
		area: 0x0E,
		submap: 0x01,
		entryRoom: 'Aljiba - Empty Room Before Laurels',
		actors: [
			npc.merchant(0x0C, 0x1A, 0x00, 0x51FF, {
				itemType: 'laurelsAljiba',
				text: 'buy some of\nmy laurels?',
				textPointer: 0xD21B,
				// execute at 7:EEB6 (ram), 1EEC6 (rom)
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Alba - Empty Room Before Garlic',
		objset: 0,
		area: 0x0F,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Alba - Garlic Room',
		objset: 0,
		area: 0x0F,
		submap: 0x01,
		entryRoom: 'Alba - Empty Room Before Garlic',
		actors: [
			npc.merchant(0x0C, 0x1A, 0x02, 0x5159, {
				itemType: 'garlicAlba',
				text: 'will you buy\nsome garlic?',
				textPointer: 0xD201,
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HOLY_WATER'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Alba - Empty Room Before Laurels',
		objset: 0,
		area: 0x10,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Alba - Laurels Room',
		objset: 0,
		area: 0x10,
		submap: 0x01,
		entryRoom: 'Alba - Empty Room Before Laurels',
		actors: [
			npc.merchant(0x0C, 0x0C, 0x00, 0x515F, {
				itemType: 'laurelsAlba',
				text: 'buy some of\nmy laurels?',
				textPointer: 0xD21B,
				actorRequirements: {
					beginner: '(HOLY_WATER || NAIL)',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: '(HOLY_WATER || NAIL)',
					morningStar: '(HOLY_WATER || NAIL)'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Ondol - Empty Room Before Morning Star',
		objset: 0,
		area: 0x11,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Ondol - Morning Star Room',
		objset: 0,
		area: 0x11,
		submap: 0x01,
		entryRoom: 'Ondol - Empty Room Before Morning Star',
		actors: [
			npc.merchant(0x0C, 0x1A, 0x0A, 0x52B4, {
				subtype: 'whip',
				itemType: 'morningStar',
				text: 'morning star\n- buy one?',
				textPointer: 0xD288,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Ondol - Death Star Lady Room',
		objset: 0,
		area: 0x12,
		submap: 0,
		actors: [
			npc.oldLady(0x0C, 0x0C, 0x49, 0x52B9, {
				text: 'don\'t look\ninto the\ndeath star,\nor you will\ndie.',
				textPointer: 0xD607
			})
		],
		ceiling: true
	},
	{
		name: 'Ondol - Empty Room Before Laurels 1',
		objset: 0,
		area: 0x13,
		submap: 0,
		ceiling: true
	},{
		name: 'Ondol - Empty Room Before Laurels 2',
		objset: 0,
		area: 0x13,
		submap: 0x01,
		ceiling: true
	},
	{
		name: 'Ondol - Laurels Room',
		objset: 0,
		area: 0x13,
		submap: 0x02,
		entryRoom: 'Ondol - Empty Room Before Laurels 1',
		actors: [
			npc.merchant(0x0C, 0x0C, 0x00, 0x52C0, {
				itemType: 'laurelsOndol',
				text: 'buy some of\nmy laurels?',
				textPointer: 0xD21B,
				actorRequirements: {
					beginner: '(HOLY_WATER || NAIL)',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: '(HOLY_WATER || NAIL)',
					morningStar: '(HOLY_WATER || NAIL)'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Doina - GET BACK! Lady Room',
		objset: 0,
		area: 0x14,
		submap: 0,
		actors: [
			npc.oldLady(0x0C, 0x0C, 0x64, 0x5204, {
				text: 'get back!',
				textPointer: 0xDB05
			})
		],
		ceiling: true
	},
	{
		name: 'Doina - Laurels Room',
		objset: 0,
		area: 0x15,
		submap: 0,
		actors: [
			npc.merchant(0x0C, 0x1A, 0x00, 0x5209, {
				itemType: 'laurelsDoina',
				text: 'buy some of\nmy laurels?',
				textPointer: 0xD21B,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS',
					diamondWarp: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Yomi - Empty Room',
		objset: 0,
		area: 0x16,
		submap: 0,
		ceiling: true
	},
	{
		name: 'Yomi - Girlfriend Room',
		objset: 0,
		area: 0x17,
		submap: 0,
		actors: [
			npc.oldLady(0x0C, 0x0C, 0x5A, 0x520F, {
				text: 'let\'s live\nhere\ntogether.',
				textPointer: 0xD951
			})
		],
		ceiling: true
	},
	{
		name: 'Laruba Mansion - Door',
		objset: 0x01,
		area: 0,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				glitch: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS',
				diamondWarp: 'WHITE_CRYSTAL && BLUE_CRYSTAL && ((RED_CRYSTAL || (DIAMOND && MAGIC_CROSS))',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
			},
			data: [
				{
					name: 'Laruba Mansion - Door',
					objset: 0x01,
					area: 0,
					submap: 0,
					target: {
						objset: 0x01,
						area: 0x06
					}
				}
			]
		}
	},
	{
		name: 'Berkeley Mansion - Door',
		objset: 0x01,
		area: 0x01,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
				standard: '',
				glitch: '',
				diamondWarp: '',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
			},
			data: [
				{
					name: 'Berkeley Mansion - Door',
					objset: 0x01,
					area: 0x01,
					submap: 0,
					target: {
						objset: 0x01,
						area: 0x07
					}
				}
			]
		}
	},
	{
		name: 'Rover Mansion - Door',
		objset: 0x01,
		area: 0x02,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL',
				standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
				glitch: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
				diamondWarp: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL'
			},
			data: [
				{
					name: 'Rover Mansion - Door',
					objset: 0x01,
					area: 0x02,
					submap: 0,
					target: {
						objset: 0x01,
						area: 0x08
					}
				}
			]
		}
	},
	{
		name: 'Brahm Mansion - Door',
		objset: 0x01,
		area: 0x03,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
				standard: 'HEART',
				glitch: 'HEART',
				diamondWarp: 'HEART',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART'
			},
			data: [
				{
					name: 'Brahm Mansion - Door',
					objset: 0x01,
					area: 0x03,
					submap: 0,
					target: {
						objset: 0x01,
						area: 0x09
					}
				}
			]
		}
	},
	{
		name: 'Bodley Mansion - Door',
		objset: 0x01,
		area: 0x04,
		submap: 0,
		doors: {
			requirements: {
				beginner: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && THORN_WHIP && HOLY_WATER',
				standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				glitch: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS',
				diamondWarp: '(WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS)',
				redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
				morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
			},
			data: [
				{
					name: 'Bodley Mansion - Door',
					objset: 0x01,
					area: 0x04,
					submap: 0,
					target: {
						objset: 0x01,
						area: 0x0A
					}
				}
			]
		}
	},
	{
		name: 'Laruba Mansion - Part 1',
		objset: 0x01,
		area: 0x06,
		submap: 0,
		actors: [
			enemy.skeleton(0x04, 0x04, 0x1E, 0x5A18),
			enemy.skeleton(0x04, 0x0E, 0x1E, 0x5A1C),
			enemy.skeleton(0x08, 0x1A, 0x1E, 0x5A20),
			enemy.skeleton(0x0C, 0x0C, 0x1E, 0x5A24),
			enemy.skeleton(0x0C, 0x1A, 0x1E, 0x5A28),
			enemy.skeleton(0x14, 0x04, 0x1E, 0x5A2C, { stairs: true }),
			enemy.skeleton(0x14, 0x0C, 0x1E, 0x5A30),
			enemy.spearKnight(0x18, 0x12, 0x1E, 0x5A34),
			enemy.spearKnight(0x18, 0x1A, 0x1E, 0x5A38),
			enemy.skeleton(0x1C, 0x0C, 0x1E, 0x5A3C),
			enemy.boneThrower(0x1C, 0x1A, 0x1E, 0x5A40),
			enemy.skeleton(0x24, 0x08, 0x1E, 0x5A44),
			enemy.spearKnight(0x24, 0x12, 0x1E, 0x5A48, { stairs: true }),
			enemy.skeleton(0x28, 0x18, 0x1E, 0x5A4C),
			enemy.skeleton(0x2C, 0x08, 0x1E, 0x5A50, { stairs: true }),
			enemy.boneThrower(0x34, 0x04, 0x1E, 0x5A54),
			enemy.skeleton(0x34, 0x14, 0x1E, 0x5A58),
			enemy.boneThrower(0x38, 0x0E, 0x1E, 0x5A5C),
			enemy.spearKnight(0x3C, 0x14, 0x1E, 0x5A60)
		],
		ceiling: true
	},
	{
		name: 'Laruba Mansion - Part 2',
		objset: 0x01,
		area: 0x06,
		submap: 0x01,
		entryRoom: 'Laruba Mansion - Part 1',
		actors: [
			npc.crystalDude(0x02, 0x34, 0x01, 0x5A65, {
				bank: 1,
				text: 'i beg of you\nto take\nthese\nlaurels.',
				textPointer: 0xDCE2,
				code: {
					loc: {
						rom: 0x535B,
						ram: 0x934B
					},
					length: 18
				},
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS',
					glitch: 'LAURELS',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && (RED_CRYSTAL || (DIAMOND && MAGIC_CROSS)) && LAURELS',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && (RED_CRYSTAL || (DIAMOND && MAGIC_CROSS)) && LAURELS && (HOLY_WATER || NAIL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL) && LAURELS'
				}
			}),
			enemy.skeleton(0x03, 0x12, 0x1E, 0x5A69, { stairs: true }),
			enemy.skeleton(0x03, 0x1A, 0x1E, 0x5A6D),
			enemy.skeleton(0x03, 0x22, 0x1E, 0x5A71),
			enemy.skeleton(0x08, 0x0E, 0x1E, 0x5A75),
			enemy.boneThrower(0x08, 0x1E, 0x1E, 0x5A79),
			enemy.skeleton(0x08, 0x28, 0x1E, 0x5A7D),
			// block
			// arrow
			// arrow
			// arrow
			enemy.skeleton(0x14, 0x0C, 0x1E, 0x5A91),
			enemy.spider(0x14, 0x2B, 0x1E, 0x5A95, { ground: 0x2E }),
			// block
			enemy.spider(0x1C, 0x2B, 0x1E, 0x5A9D, { ground: 0x2E }),
			npc.merchant(0x1D, 0x0C, 0x06, 0x5AA1, {
				itemType: 'oakRing',
				text: 'invest in an\noak stake?',
				textPointer: 0xD044,
				actorRequirements: {
					beginner:'',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: 'LAURELS',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && (RED_CRYSTAL || (DIAMOND && MAGIC_CROSS)) && LAURELS',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL'
				}
			}),
			enemy.skeleton(0x24, 0x12, 0x1E, 0x5AA5),
			enemy.boneThrower(0x24, 0x26, 0x1E, 0x5AA9),
			enemy.boneThrower(0x28, 0x0C, 0x1E, 0x5AAD),
			enemy.boneThrower(0x28, 0x16, 0x1E, 0x5AB1),
			enemy.spearKnight(0x28, 0x20, 0x1E, 0x5AB5),
			enemy.spearKnight(0x2A, 0x30, 0x1E, 0x5AB9),
			enemy.skeleton(0x2C, 0x12, 0x1E, 0x5ABD),
			enemy.skeleton(0x2C, 0x20, 0x1E, 0x5AC1)
		],
		ceiling: true
	},
	{
		name: 'Laruba Mansion - Camilla Fight',
		objset: 0x01,
		area: 0x06,
		submap: 0x02,
		boss: true,
		camilla: true,
		entryRoom: 'Laruba Mansion - Part 1',
		actors: [
			enemy.camilla(0x08, 0x0A, 0xF0, 0x5AC6, {
				bank: 1,
				text: 'you now\npossess the\nmagic cross.',
				textPointer: 0xD1D7,
				code: {
					loc: {
						rom: 0x47CF,
						ram: 0x87BF
					},
					length: 6
				},
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: ''
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS',
					glitch: 'LAURELS',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS',
					redCrystal: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && (RED_CRYSTAL || (DIAMOND && MAGIC_CROSS)) && LAURELS',
					morningStar: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Laruba Mansion - Orb Room',
		objset: 0x01,
		area: 0x06,
		submap: 0x03,
		entryRoom: 'Laruba Mansion - Part 1',
		actors: [
			fixture.orb(0x0D, 0x07, 0x1C, 0x5ACB, {
				subtype: 'ring',
				text: 'you now\nprossess\ndracula\'s\nring.',
				textPointer: 0xD023,
				actorRequirements: {
					beginner: 'OAK_STAKE',
					standard: 'OAK_STAKE',
					glitch: 'OAK_STAKE',
					diamondWarp: 'OAK_STAKE',
					redCrystal: 'OAK_STAKE',
					morningStar: 'OAK_STAKE'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE && LAURELS',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE && LAURELS',
					glitch: 'LAURELS && OAK_STAKE',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE && LAURELS',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && (RED_CRYSTAL || (DIAMOND && MAGIC_CROSS)) && (HOLY_WATER || NAIL) && OAK_STAKE',
					morningStar: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && LAURELS && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Berkeley Mansion - Part 1',
		objset: 0x01,
		area: 0x07,
		submap: 0,
		actors: [
			enemy.spearKnight(0x04, 0x0E, 0x02, 0x5AD4, { stairs: true }),
			// block
			enemy.skeleton(0x08, 0x10, 0x02, 0x5ADC, { stairs: true }),
			enemy.skeleton(0x08, 0x14, 0x02, 0x5AE0, { stairs: true }),
			enemy.skeleton(0x0C, 0x08, 0x02, 0x5AE4),
			enemy.spearKnight(0x0C, 0x1E, 0x02, 0x5AE8),
			enemy.mansionBlob(0x14, 0x0E, 0x01, 0x5AEC),
			enemy.gargoyle(0x14, 0x18, 0x02, 0x5AF0),
			enemy.skeleton(0x18, 0x08, 0x02, 0x5AF4),
			enemy.skeleton(0x18, 0x1E, 0x02, 0x5AF8),
			enemy.skeleton(0x18, 0x26, 0x02, 0x5AFC),
			enemy.mansionBlob(0x1C, 0x0E, 0x01, 0x5B00),
			enemy.mansionBlob(0x1C, 0x18, 0x01, 0x5B04),
			enemy.mansionBlob(0x24, 0x0E, 0x01, 0x5B08),
			enemy.mansionBlob(0x24, 0x18, 0x01, 0x5B0C, { stairs: true, noZigZagBat: true }),
			enemy.skeleton(0x28, 0x08, 0x02, 0x5B10),
			enemy.mansionBlob(0x28, 0x18, 0x01, 0x5B14, { noZigZagBat: true }),
			enemy.skeleton(0x28, 0x1E, 0x02, 0x5B18, { noZigZagBat: true }),
			enemy.mansionBlob(0x2C, 0x0E, 0x01, 0x5B1C),
			enemy.gargoyle(0x2C, 0x26, 0x02, 0x5B20, { noZigZagBat: true }),
			enemy.skeleton(0x34, 0x0C, 0x02, 0x5B24),
			enemy.skeleton(0x34, 0x26, 0x02, 0x5B28),
			enemy.skeleton(0x38, 0x06, 0x02, 0x5B2C),
			enemy.skeleton(0x3C, 0x0C, 0x02, 0x5B30),
			enemy.skeleton(0x3C, 0x22, 0x02, 0x5B34, { stairs: true }),
			fixture.book(0x3E, 0x0C, 0x1E, 0x5B38, {
				text: 'a symbol of\nevil will\nappear when\nyou strike\nthe stake.',
				textPointer: 0xD05C,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL || EYEBALL)',
					diamondWarp: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && WHITE_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Berkeley Mansion - Part 2',
		objset: 0x01,
		area: 0x07,
		submap: 0x01,
		entryRoom: 'Berkeley Mansion - Part 1',
		actors: [
			fixture.book(0x01, 0x0C, 0x1F, 0x5B3D, {
				text: 'destroy the\ncurse and\nyou\'ll rule\nbrahm\'s\nmansion.',
				textPointer: 0xD094,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL',
					standard: 'HOLY_WATER || NAIL',
					glitch: 'HOLY_WATER || NAIL',
					diamondWarp: 'HOLY_WATER || NAIL',
					redCrystal: 'HOLY_WATER || NAIL',
					morningStar: 'HOLY_WATER || NAIL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'WHITE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.gargoyle(0x04, 0x26, 0x02, 0x5B41),
			npc.merchant(0x07, 0x0C, 0x06, 0x5B45, {
				itemType: 'oakRib',
				text: 'invest in an\noak stake?',
				textPointer: 0xD044,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: ''
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: 'WHITE_CRYSTAL',
					glitch: '',
					diamondWarp: 'WHITE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'WHITE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.spearKnight(0x08, 0x22, 0x02, 0x5B49),
			enemy.boneThrower(0x0C, 0x06, 0x02, 0x5B4D),
			enemy.gargoyle(0x0C, 0x26, 0x02, 0x5B51),
			enemy.skeleton(0x14, 0x1C, 0x02, 0x5B55, { stairs: true }),
			enemy.spearKnight(0x14, 0x22, 0x02, 0x5B59, { stairs: true }),
			enemy.spearKnight(0x14, 0x26, 0x02, 0x5B5D),
			enemy.boneThrower(0x18, 0x06, 0x02, 0x5B61),
			enemy.skeleton(0x18, 0x16, 0x02, 0x5B65, { stairs: true }),
			enemy.skeleton(0x1C, 0x0C, 0x02, 0x5B69),
			enemy.skeleton(0x1C, 0x12, 0x02, 0x5B6D),
			enemy.spearKnight(0x1C, 0x26, 0x02, 0x5B71),
			enemy.skeleton(0x28, 0x12, 0x02, 0x5B75, { stairs: true }),
			enemy.skeleton(0x28, 0x1E, 0x02, 0x5B79),
			enemy.skeleton(0x28, 0x24, 0x02, 0x5B7D),
			enemy.mansionBlob(0x2C, 0x16, 0x01, 0x5B81),
			enemy.skeleton(0x2C, 0x1A, 0x02, 0x5B85),
			enemy.skeleton(0x2C, 0x26, 0x02, 0x5B89),
			fixture.book(0x2E, 0x16, 0x20, 0x5B8D, {
				text: 'a flame\nflickers\ninside the\nring of\nfire.',
				textPointer: 0xD0C7,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL || EYEBALL)',
					diamondWarp: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: 'WHITE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL || EYEBALL)'
				}
			}),
			enemy.mansionBlob(0x34, 0x26, 0x01, 0x5B91),
			enemy.mansionBlob(0x38, 0x26, 0x01, 0x5B95),
			fixture.orb(0x3D, 0x15, 0x18, 0x5B99, {
				subtype: 'rib',
				text: 'you now\nprossess\ndracula\'s\nrib.',
				textPointer: 0xCF9C,
				actorRequirements: {
					beginner: 'OAK_STAKE',
					standard: 'OAK_STAKE',
					glitch: 'OAK_STAKE',
					diamondWarp: 'OAK_STAKE',
					redCrystal: 'OAK_STAKE',
					morningStar: 'OAK_STAKE'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && OAK_STAKE',
					standard: 'WHITE_CRYSTAL && OAK_STAKE',
					glitch: 'OAK_STAKE',
					diamondWarp: 'WHITE_CRYSTAL && OAK_STAKE',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE',
					morningStar: 'WHITE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Rover Mansion - Part 1',
		objset: 0x01,
		area: 0x08,
		submap: 0,
		actors: [
			enemy.spearKnight(0x04, 0x0A, 0x04, 0x5BA2, { stairs: true }),
			enemy.skeleton(0x08, 0x10, 0x04, 0x5BA6, { stairs: true }),
			enemy.skeleton(0x08, 0x18, 0x04, 0x5BAA),
			enemy.spearKnight(0x08, 0x28, 0x04, 0x5BAE),
			enemy.skeleton(0x0C, 0x0A, 0x04, 0x5BB2),
			enemy.skeleton(0x0C, 0x20, 0x04, 0x5BB6),
			enemy.boneThrower(0x0C, 0x28, 0x04, 0x5BBA, { stairs: true }),
			enemy.gargoyle(0x14, 0x0A, 0x04, 0x5BBE),
			enemy.mansionBat(0x14, 0x0C, 0x04, 0x5BC2, { ground: 0x0E }),
			enemy.mansionBat(0x14, 0x16, 0x04, 0x5BC6, { ground: 0x16 }),
			enemy.boneThrower(0x14, 0x28, 0x04, 0x5BCA),
			enemy.spearKnight(0x18, 0x10, 0x04, 0x5BCE),
			enemy.mansionBat(0x18, 0x16, 0x04, 0x5BD2, { ground: 0x16 }),
			enemy.skeleton(0x18, 0x28, 0x04, 0x5BD6),
			enemy.gargoyle(0x1C, 0x0A, 0x04, 0x5BDA),
			enemy.mansionBat(0x1C, 0x0C, 0x04, 0x5BDE, { ground: 0x0E }),
			enemy.mansionBat(0x1C, 0x16, 0x04, 0x5BE2, { ground: 0x16 }),
			enemy.skeleton(0x1C, 0x20, 0x04, 0x5BE6),
			enemy.skeleton(0x23, 0x1E, 0x04, 0x5BEA),
			enemy.skeleton(0x24, 0x0A, 0x04, 0x5BEE),
			enemy.skeleton(0x24, 0x10, 0x04, 0x5BF2),
			enemy.skeleton(0x27, 0x1C, 0x04, 0x5BF6),
			enemy.skeleton(0x28, 0x0A, 0x04, 0x5BFA),
			enemy.skeleton(0x2C, 0x16, 0x04, 0x5BFE),
			enemy.skeleton(0x2C, 0x22, 0x04, 0x5C02)
		],
		ceiling: true
	},
	{
		name: 'Rover Mansion - Part 2',
		objset: 0x01,
		area: 0x08,
		submap: 0x01,
		entryRoom: 'Rover Mansion - Part 1',
		actors: [
			enemy.boneThrower(0x03, 0x28, 0x04, 0x5C07),
			enemy.boneThrower(0x07, 0x28, 0x04, 0x5C0B),
			enemy.skeleton(0x14, 0x14, 0x04, 0x5C0F, { stairs: true }),
			enemy.skeleton(0x14, 0x1C, 0x04, 0x5C13, { stairs: true }),
			enemy.skeleton(0x18, 0x16, 0x04, 0x5C17),
			enemy.skeleton(0x18, 0x22, 0x04, 0x5C1B, { stairs: true }),
			enemy.skeleton(0x24, 0x08, 0x04, 0x5C1F),
			enemy.skeleton(0x24, 0x12, 0x04, 0x5C23),
			enemy.spearKnight(0x24, 0x1A, 0x04, 0x5C27),
			// block
			enemy.skeleton(0x28, 0x0E, 0x04, 0x5C2F),
			enemy.spearKnight(0x28, 0x1A, 0x04, 0x5C33),
			enemy.skeleton(0x2C, 0x08, 0x04, 0x5C37),
			enemy.spearKnight(0x34, 0x08, 0x04, 0x5C3B, { stairs: true }),
			enemy.boneThrower(0x34, 0x28, 0x04, 0x5C3F),
			enemy.skeleton(0x38, 0x22, 0x04, 0x5C43),
			npc.merchant(0x38, 0x28, 0x06, 0x5C47, {
				itemType: 'oakHeart',
				text: 'invest in an\noak stake?',
				textPointer: 0xD044,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: ''
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL',
					standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
					glitch: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
					diamondWarp: 'WHITE_CRYSTAL && BLUE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			fixture.orb(0x3D, 0x15, 0x19, 0x5C4B, {
				subtype: 'heart',
				text: 'you now\nprossess\ndracula\'s\nheart.',
				textPointer: 0xCFBC,
				actorRequirements: {
					beginner: 'OAK_STAKE',
					standard: 'OAK_STAKE',
					glitch: 'OAK_STAKE',
					diamondWarp: 'OAK_STAKE',
					redCrystal: 'OAK_STAKE',
					morningStar: 'OAK_STAKE'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL',
					standard: 'WHITE_CRYSTAL && BLUE_CRYSTAL && OAK_STAKE',
					glitch: 'WHITE_CRYSTAL && BLUE_CRYSTAL && OAK_STAKE',
					diamondWarp: 'WHITE_CRYSTAL && BLUE_CRYSTAL && OAK_STAKE',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			fixture.book(0x3E, 0x08, 0x21, 0x5C4F, {
				text: 'garlic in\nthe\ngraveyard\nsummons a\nstranger.',
				textPointer: 0xD0F1,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					diamondWarp: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL || EYEBALL)'
				}
			}),
			fixture.book(0x3E, 0x22, 0x22, 0x5C53, {
				text: 'destroy the\ncurse with\ndracula\'s\nheart.',
				textPointer: 0xD11D,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL',
					standard: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					diamondWarp: '(HOLY_WATER || NAIL || EYEBALL) && WHITE_CRYSTAL && BLUE_CRYSTAL',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR && (HOLY_WATER || NAIL || EYEBALL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Rover -> Laruba Wrong Warp',
		objset: 0x01,
		area: 0x08,
		submap: 0x02,
		entryRoom: 'Rover Mansion - Part 1',
		ceiling: true
	},
	{
		name: 'Brahm Mansion - Part 1',
		objset: 0x01,
		area: 0x09,
		submap: 0,
		actors: [
			fixture.book(0x01, 0x10, 0x23, 0x5C60, {
				text: 'place the\nlaurels in a\nsilk bag to\nbring them\nto life.',
				textPointer: 0xD145,
				actorRequirements: {
					beginner: 'HOLY_WATER',
					standard: 'HOLY_WATER',
					glitch: 'HOLY_WATER',
					diamondWarp: 'HOLY_WATER',
					redCrystal: 'HOLY_WATER',
					morningStar: 'HOLY_WATER'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
					standard: 'HOLY_WATER && HEART',
					glitch: 'HOLY_WATER && HEART',
					diamondWarp: 'HOLY_WATER && HEART',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART && HOLY_WATER',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART && HOLY_WATER'
				}
			}),
			enemy.skeleton(0x03, 0x10, 0x08, 0x5C64),
			enemy.skeleton(0x04, 0x2E, 0x08, 0x5C68),
			enemy.skeleton(0x08, 0x1E, 0x08, 0x5C6C, { stairs: true }),
			enemy.mansionBlob(0x08, 0x2A, 0x04, 0x5C70),
			enemy.skeleton(0x0C, 0x16, 0x08, 0x5C74),
			enemy.mansionBlob(0x0C, 0x24, 0x04, 0x5C78),
			enemy.spearKnight(0x0C, 0x30, 0x08, 0x5C7C),
			enemy.skeleton(0x14, 0x0E, 0x08, 0x5C80),
			enemy.spearKnight(0x14, 0x24, 0x08, 0x5C84),
			enemy.gargoyle(0x18, 0x08, 0x08, 0x5C88),
			enemy.skeleton(0x18, 0x16, 0x08, 0x5C8C, { stairs: true }),
			enemy.skeleton(0x18, 0x2A, 0x08, 0x5C90, { stairs: true }),
			enemy.spearKnight(0x18, 0x30, 0x08, 0x5C94, { stairs: true }),
			enemy.skeleton(0x1C, 0x0E, 0x08, 0x5C98),
			enemy.skeleton(0x1C, 0x1E, 0x08, 0x5C9C),
			npc.merchant(0x23, 0x16, 0x06, 0x5CA0, {
				itemType: 'oakEye',
				text: 'invest in an\noak stake?',
				textPointer: 0xD044,
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
					standard: 'HEART',
					glitch: 'HEART',
					diamondWarp: 'HEART',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART'
				}
			}),
			enemy.spearKnight(0x24, 0x20, 0x08, 0x5CA4, { stairs: true }),
			enemy.mansionBlob(0x24, 0x30, 0x04, 0x5CA8, { stairs: true }),
			enemy.mansionBlob(0x24, 0x36, 0x04, 0x5CAC),
			enemy.spearKnight(0x28, 0x08, 0x08, 0x5CB0),
			enemy.spearKnight(0x28, 0x18, 0x08, 0x5CB4, { stairs: true }),
			enemy.spearKnight(0x28, 0x1C, 0x08, 0x5CB8),
			enemy.skeleton(0x2C, 0x26, 0x08, 0x5CBC, { stairs: true })
		],
		ceiling: true
	},
	{
		name: 'Brahm Mansion - Part 2',
		objset: 0x01,
		area: 0x09,
		submap: 0x01,
		entryRoom: 'Brahm Mansion - Part 1',
		actors: [
			enemy.gargoyle(0x04, 0x0C, 0x08, 0x5CC1),
			enemy.spearKnight(0x04, 0x16, 0x08, 0x5CC5, { stairs: true }),
			enemy.mansionBat(0x04, 0x32, 0x04, 0x5CC9, { ground: 0x36 }),
			enemy.mansionBat(0x08, 0x32, 0x04, 0x5CCD, { ground: 0x36 }),
			enemy.gargoyle(0x0C, 0x0C, 0x08, 0x5CD1, { stairs: true }),
			enemy.mansionBat(0x0C, 0x32, 0x04, 0x5CD5, { ground: 0x36 }),
			fixture.book(0x0E, 0x18, 0x24, 0x5CD9, {
				text: 'wait for a\nsoul with a\nred crystal\non deborah\ncliff.',
				textPointer: 0xD17C,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
					standard: '(HOLY_WATER || NAIL || EYEBALL) && HEART',
					glitch: '(HOLY_WATER || NAIL || EYEBALL) && HEART',
					diamondWarp: '(HOLY_WATER || NAIL || EYEBALL) && HEART',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART && (HOLY_WATER || NAIL || EYEBALL)'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Brahm Mansion - Death Fight',
		objset: 0x01,
		area: 0x09,
		submap: 0x02,
		boss: true,
		death: true,
		entryRoom: 'Brahm Mansion - Part 1',
		actors: [
			enemy.death(0x08, 0x08, 0x80, 0x5CDE, {
				bank: 1,
				text: 'you now\npossess\nthe golden\nknife.',
				textPointer: 0xDCC0,
				code: {
					loc: {
						rom: 0x47D7,
						ram: 0x87C7
					},
					length: 4
				},
				actorRequirements: {
					beginner: '',
					standard: '',
					glitch: '',
					diamondWarp: '',
					redCrystal: '',
					morningStar: '',
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
					standard: 'HEART',
					glitch: 'HEART',
					diamondWarp: 'HEART',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Brahm Mansion - Orb Room',
		objset: 0x01,
		area: 0x09,
		submap: 0x03,
		entryRoom: 'Brahm Mansion - Part 1',
		actors: [
			fixture.orb(0x0D, 0x07, 0x1A, 0x5CE3, {
				subtype: 'eyeball',
				text: 'you now\nprossess\ndracula\'s\neyeball.',
				textPointer: 0xCFDE,
				actorRequirements: {
					beginner: 'OAK_STAKE',
					standard: 'OAK_STAKE',
					glitch: 'OAK_STAKE',
					diamondWarp: 'OAK_STAKE',
					redCrystal: 'OAK_STAKE',
					morningStar: 'OAK_STAKE'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART && OAK_STAKE',
					standard: 'HEART && OAK_STAKE',
					glitch: 'HEART && OAK_STAKE',
					diamondWarp: 'HEART && OAK_STAKE',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART && OAK_STAKE',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && HEART && OAK_STAKE'
				}
			})
		],
		ceiling: true
	},
	{
		name: 'Bodley Mansion - Part 1',
		objset: 0x01,
		area: 0x0A,
		submap: 0,
		actors: [
			enemy.skeleton(0x04, 0x0C, 0x0F, 0x5F0E),
			enemy.spearKnight(0x08, 0x28, 0x0F, 0x5F12),
			enemy.rock(0x09, 0x0C, 0x00, 0x5F16, { ground: 0x0C }),
			enemy.rock(0x0A, 0x0C, 0x00, 0x5F1A, { ground: 0x0C }),
			enemy.rock(0x0B, 0x0C, 0x00, 0x5F1E, { ground: 0x0C }),
			enemy.rock(0x0C, 0x0C, 0x00, 0x5F22, { ground: 0x0C }),
			enemy.rock(0x0D, 0x0C, 0x00, 0x5F26, { ground: 0x0C }),
			enemy.rock(0x0E, 0x0C, 0x00, 0x5F2A, { ground: 0x0C }),
			enemy.rock(0x0F, 0x0C, 0x00, 0x5F2E, { ground: 0x0C }),
			enemy.mansionBlob(0x14, 0x12, 0x08, 0x5F32, { stairs: true }),
			enemy.skeleton(0x14, 0x28, 0x0F, 0x5F36),
			enemy.skeleton(0x18, 0x0C, 0x0F, 0x5F3A, { stairs: true }),
			enemy.skeleton(0x18, 0x1A, 0x0F, 0x5F3E),
			enemy.skeleton(0x18, 0x20, 0x0F, 0x5F42, { stairs: true }),
			enemy.mansionBlob(0x1C, 0x12, 0x08, 0x5F46, { stairs: true }),
			enemy.skeleton(0x24, 0x08, 0x0F, 0x5F4A),
			enemy.skeleton(0x24, 0x28, 0x0F, 0x5F4E),
			enemy.skeleton(0x28, 0x06, 0x0F, 0x5F52),
			enemy.skeleton(0x28, 0x20, 0x0F, 0x5F56),
			enemy.skeleton(0x34, 0x0C, 0x0F, 0x5F5A),
			enemy.skeleton(0x34, 0x20, 0x0F, 0x5F5E),
			enemy.skeleton(0x3C, 0x06, 0x0F, 0x5F62)
		],
		ceiling: true
	},
	{
		name: 'Bodley Mansion - Part 2',
		objset: 0x01,
		area: 0x0A,
		submap: 0x01,
		entryRoom: 'Bodley Mansion - Part 1',
		actors: [
			enemy.skeleton(0x04, 0x0C, 0x0F, 0x5F67),
			enemy.skeleton(0x04, 0x14, 0x0F, 0x5F6B),
			enemy.skeleton(0x04, 0x2E, 0x0F, 0x5F6F),
			enemy.skeleton(0x08, 0x06, 0x0F, 0x5F73),
			enemy.skeleton(0x08, 0x14, 0x0F, 0x5F77),
			enemy.skeleton(0x08, 0x1A, 0x0F, 0x5F7B, { stairs: true }),
			enemy.skeleton(0x08, 0x20, 0x0F, 0x5F7F),
			enemy.skeleton(0x08, 0x2C, 0x0F, 0x5F83, { stairs: true }),
			enemy.skeleton(0x0C, 0x0C, 0x0F, 0x5F87),
			enemy.skeleton(0x0C, 0x36, 0x0F, 0x5F8B),
			enemy.skeleton(0x14, 0x36, 0x0F, 0x5F8F),
			enemy.skeleton(0x18, 0x30, 0x0F, 0x5F93),
			npc.merchant(0x18, 0x2A, 0x06, 0x5F97, {
				itemType: 'oakNail',
				text: 'invest in an\noak stake?',
				textPointer: 0xD044,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL',
					standard: 'HOLY_WATER || NAIL',
					glitch: 'HOLY_WATER || NAIL',
					diamondWarp: 'HOLY_WATER || NAIL',
					redCrystal: 'HOLY_WATER || NAIL',
					morningStar: 'HOLY_WATER || NAIL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS)',
					diamondWarp: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS))',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL) && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.skeleton(0x1C, 0x1A, 0x0F, 0x5F9B),
			enemy.skeleton(0x1C, 0x36, 0x0F, 0x5F9F),
			enemy.skeleton(0x28, 0x1A, 0x0F, 0x5FA3),
			fixture.book(0x2C, 0x16, 0x25, 0x5FA7, {
				text: 'the curse\nhas killed\nthe laurel\ntree.',
				textPointer: 0xD1B1,
				actorRequirements: {
					beginner: 'HOLY_WATER || NAIL || EYEBALL',
					standard: 'HOLY_WATER || NAIL || EYEBALL',
					glitch: 'HOLY_WATER || NAIL || EYEBALL',
					diamondWarp: 'HOLY_WATER || NAIL || EYEBALL',
					redCrystal: 'HOLY_WATER || NAIL || EYEBALL',
					morningStar: 'HOLY_WATER || NAIL || EYEBALL'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS)',
					diamondWarp: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS))',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && REC_CRYSTAL && (HOLY_WATER || NAIL)'
				}
			}),
			fixture.orb(0x2D, 0x31, 0x1B, 0x5FAB, {
				subtype: 'nail',
				text: 'you now\nprossess\ndracula\'s\nnail.',
				textPointer: 0xD002,
				actorRequirements: {
					beginner: '(HOLY_WATER || NAIL) && OAK_STAKE',
					standard: '(HOLY_WATER || NAIL) && OAK_STAKE',
					glitch: '(HOLY_WATER || NAIL) && OAK_STAKE',
					diamondWarp: '(HOLY_WATER || NAIL) && OAK_STAKE',
					redCrystal: '(HOLY_WATER || NAIL) && OAK_STAKE',
					morningStar: '(HOLY_WATER || NAIL) && OAK_STAKE'
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE',
					glitch: '((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS) && OAK_STAKE',
					diamondWarp: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || (DIAMOND && MAGIC_CROSS)) && OAK_STAKE',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL) && OAK_STAKE',
					morningStar: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && OAK_STAKE && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.boneThrower(0x34, 0x28, 0x06, 0x5FAF),
			enemy.spearKnight(0x38, 0x14, 0x0F, 0x5FB3),
			enemy.spearKnight(0x38, 0x1A, 0x0F, 0x5FB7, { stairs: true }),
			enemy.spearKnight(0x3C, 0x20, 0x0F, 0x5FBB)
		],
		ceiling: true
	},
	{
		name: 'Jova Woods',
		objset: 0x02,
		area: 0,
		submap: 0,
		actors: [
			enemy.werewolf(0x08, 0x0C, 0x02, 0x5FF4),
			enemy.skeleton(0x0C, 0x0C, 0x01, 0x5FF8),
			enemy.werewolf(0x14, 0x0C, 0x02, 0x5FFC),
			enemy.skeleton(0x18, 0x0A, 0x01, 0x6000),
			enemy.werewolf(0x1C, 0x08, 0x02, 0x6004),
			enemy.skeleton(0x28, 0x0A, 0x01, 0x6008),
			enemy.skeleton(0x2C, 0x0C, 0x01, 0x600C),
			enemy.skeleton(0x34, 0x0A, 0x01, 0x6010),
			enemy.skeleton(0x3C, 0x0B, 0x01, 0x6014)
		]
	},
	{
		name: 'Jova-Veros Bridge',
		objset: 0x02,
		area: 0,
		submap: 0x01,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x01, 0x6019),
			enemy.skeleton(0x0C, 0x09, 0x01, 0x601D),
			enemy.fishman(0x0E, 0x0C, 0x01, 0x6021, { ground: 0x09 }),
			enemy.fishman(0x15, 0x0C, 0x01, 0x6025, { ground: 0x09 }),
			enemy.fishman(0x1A, 0x0C, 0x01, 0x6029, { ground: 0x0B }),
			enemy.fishman(0x25, 0x0C, 0x01, 0x602D, { ground: 0x09 }),
			enemy.fishman(0x2A, 0x0C, 0x01, 0x6031, { ground: 0x0B }),
			enemy.skeleton(0x34, 0x09, 0x01, 0x6035),
			enemy.fishman(0x35, 0x0C, 0x01, 0x6039, { ground: 0x09 }),
			enemy.skeleton(0x38, 0x0A, 0x01, 0x603D)
		]
	},
	{
		name: 'Veros Woods - Part 1',
		objset: 0x02,
		area: 0,
		submap: 0x02,
		actors: [
			enemy.skeleton(0x08, 0x06, 0x01, 0x6042),
			enemy.skeleton(0x08, 0x0C, 0x01, 0x6046),
			// low priority sprite
			enemy.skeleton(0x14, 0x06, 0x01, 0x604E, { stairs: true }),
			enemy.skeleton(0x18, 0x0C, 0x01, 0x6052, { stairs: true }),
			enemy.skeleton(0x19, 0x06, 0x01, 0x6056),
			enemy.skeleton(0x1D, 0x08, 0x01, 0x605A)
		]
	},
	{
		name: 'Veros Woods - Part 2',
		objset: 0x02,
		area: 0,
		submap: 0x03,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x01, 0x605F, { stairs: true }),
			enemy.skeleton(0x08, 0x0B, 0x01, 0x6063),
			enemy.skeleton(0x0C, 0x0C, 0x01, 0x6067),
			// low priority sprite
			enemy.skeleton(0x14, 0x0A, 0x01, 0x606F),
			enemy.skeleton(0x18, 0x0A, 0x01, 0x6073)
		]
	},
	{
		name: 'Denis Woods - Part 1',
		objset: 0x02,
		area: 0x01,
		submap: 0,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x01, 0x6078),
			enemy.fishman(0x0A, 0x0C, 0x01, 0x607C, { ground: 0x0B }),
			enemy.skeleton(0x14, 0x0A, 0x01, 0x6080),
			enemy.skeleton(0x18, 0x0A, 0x01, 0x6084)
		]
	},
	{
		name: 'Aljiba Woods - Part 3',
		objset: 0x02,
		area: 0x02,
		submap: 0,
		actors: [
			enemy.spider(0x08, 0x06, 0x02, 0x666A, { ground: 0x0A }),
			enemy.skeleton(0x0C, 0x0C, 0x02, 0x666E),
			enemy.skeleton(0x14, 0x0A, 0x02, 0x6672),
			enemy.spider(0x18, 0x06, 0x02, 0x6676, { ground: 0x0A }),
			enemy.skeleton(0x1C, 0x0B, 0x02, 0x667A)
		]
	},
	{
		name: 'Dabi\'s Path - Part 1',
		objset: 0x02,
		area: 0x03,
		submap: 0,
		actors: [
			// low priority sprite
			enemy.skeleton(0x08, 0x0C, 0x02, 0x6683),
			enemy.eyeball(0x08, 0x12, 0x02, 0x6687, { ground: 0x12 }),
			enemy.skeleton(0x08, 0x18, 0x02, 0x668B),
			enemy.eyeball(0x0C, 0x06, 0x02, 0x668F, { ground: 0x06 }),
			enemy.skeleton(0x0C, 0x18, 0x02, 0x6693),
			// low priority sprite
			enemy.eyeball(0x14, 0x0C, 0x02, 0x669B, { ground: 0x0C }),
			enemy.skeleton(0x14, 0x1A, 0x02, 0x669F),
			enemy.eyeball(0x18, 0x06, 0x02, 0x66A3, { ground: 0x06 }),
			enemy.skeleton(0x18, 0x16, 0x02, 0x66A7, { stairs: true }),
			enemy.eyeball(0x1C, 0x0C, 0x02, 0x66AB, { stairs: true, ground: 0x0C })
		],
		ceiling: true
	},
	{
		name: 'Dabi\'s Path - Part 2',
		objset: 0x02,
		area: 0x03,
		submap: 0x01,
		actors: [
			fixture.sacredFlame(0x01, 0x0C, 0x76, 0x66B0, {
				bank: 1,
				text: 'you now\npossess\nthe sacred\nflame.',
				textPointer: 0xDC9E,
				code: {
					loc: {
						rom: 0x47DD,
						ram: 0x87CD
					},
					length: 6
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && HOLY_WATER',
					standard: '(HOLY_WATER || NAIL)',
					glitch: '(HOLY_WATER || NAIL)',
					diamondWarp: '(HOLY_WATER || NAIL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: '(HOLY_WATER || NAIL) && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.eyeball(0x04, 0x04, 0x02, 0x66B4, { ground: 0x04 }),
			enemy.zigzagBat(0x04, 0x0C, 0x02, 0x66B8, { ground: 0x0C }),
			enemy.eyeball(0x0C, 0x06, 0x02, 0x66BC, { stairs: true, ground: 0x06 }),
			enemy.zigzagBat(0x0C, 0x0C, 0x02, 0x66C0, { ground: 0x0C }),
			enemy.eyeball(0x14, 0x06, 0x02, 0x66C4, { ground: 0x06 }),
			enemy.zigzagBat(0x14, 0x0C, 0x02, 0x66C8, { ground: 0x0C }),
			enemy.zigzagBat(0x1C, 0x0C, 0x02, 0x66CC, { ground: 0x0C })
		],
		ceiling: true,
		spriteLimit: true
	},
	{
		name: 'Aljiba Woods - Part 1',
		objset: 0x02,
		area: 0x03,
		submap: 0x02,
		actors: [
			enemy.spider(0x04, 0x04, 0x02, 0x66D1, { ground: 0x0C }),
			fixture.book(0x05, 0x0D, 0x0D, 0x66D5, {
				text: 'to replenish\nearth ,kneel\nby the lake\nwith the\nblue crystal.',
				textPointer: 0xCE4C,
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || EYEBALL)',
					glitch: '(HOLY_WATER || EYEBALL)',
					diamondWarp: '(HOLY_WATER || EYEBALL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || EYEBALL)',
					morningStar: '(HOLY_WATER || EYEBALL) && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.skeleton(0x08, 0x08, 0x02, 0x66D9),
			enemy.spider(0x0C, 0x06, 0x02, 0x66DD, { ground: 0x08 }),
			enemy.spider(0x14, 0x06, 0x02, 0x66E1, { ground: 0x0C }),
			enemy.skeleton(0x18, 0x0A, 0x02, 0x66E5),
			enemy.skeleton(0x1C, 0x08, 0x02, 0x66E9)
		]
	},
	{
		name: 'Aljiba Woods - Part 2',
		objset: 0x02,
		area: 0x03,
		submap: 0x03,
		actors: [
			enemy.skeleton(0x04, 0x08, 0x02, 0x66EE, { stairs: true }),
			enemy.skeleton(0x08, 0x0A, 0x02, 0x66F2),
			enemy.skeleton(0x0C, 0x0C, 0x02, 0x66F6),
			enemy.skeleton(0x14, 0x0C, 0x02, 0x66FA),
			enemy.skeleton(0x18, 0x0A, 0x02, 0x66FE)
		]
	},
	{
		name: 'Denis Woods - Part 2',
		objset: 0x02,
		area: 0x04,
		submap: 0,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x02, 0x6703),
			enemy.skeleton(0x08, 0x0A, 0x02, 0x6707),
			enemy.skeleton(0x0C, 0x0B, 0x02, 0x670B),
			enemy.skeleton(0x14, 0x08, 0x02, 0x670F),
			enemy.zigzagBat(0x16, 0x0C, 0x02, 0x6713, { ground: 0x0C }),
			enemy.skeleton(0x18, 0x06, 0x02, 0x6717),
			// low priority sprite
			enemy.skeleton(0x24, 0x06, 0x02, 0x671F),
			// low priority sprite
			enemy.skeleton(0x28, 0x08, 0x02, 0x6727, { stairs: true }),
			enemy.skeleton(0x2C, 0x08, 0x02, 0x672B),
			enemy.zigzagBat(0x2D, 0x0C, 0x02, 0x672F, { ground: 0x0C })
		]
	},
	{
		name: 'Denis Woods - Part 3',
		objset: 0x02,
		area: 0x04,
		submap: 0x01,
		actors: [
			enemy.spider(0x04, 0x06, 0x02, 0x6734, { ground: 0x0C }),
			enemy.skeleton(0x08, 0x0C, 0x02, 0x6738),
			enemy.spider(0x0C, 0x06, 0x02, 0x673C, { ground: 0x0C }),
			enemy.spider(0x14, 0x06, 0x02, 0x6740, { ground: 0x0C }),
			enemy.skeleton(0x18, 0x0A, 0x02, 0x6744)
		]
	},
	{
		name: 'Yuba Lake Path',
		objset: 0x02,
		area: 0x05,
		submap: 0,
		actors: [
			enemy.skeleton(0x08, 0x0A, 0x02, 0x6749),
			enemy.skeleton(0x0C, 0x08, 0x02, 0x674D),
			enemy.eyeball(0x14, 0x0C, 0x02, 0x6751, { ground: 0x0C }),
			enemy.skeleton(0x18, 0x06, 0x02, 0x6755),
			enemy.skeleton(0x1C, 0x06, 0x02, 0x6759, { stairs: true }),
			enemy.eyeball(0x1D, 0x0C, 0x02, 0x675D, { ground: 0x0C }),
			enemy.skeleton(0x24, 0x06, 0x02, 0x6761),
			// block
			enemy.skeleton(0x2C, 0x04, 0x02, 0x6769),
			// block
			enemy.skeleton(0x38, 0x06, 0x02, 0x6771, { stairs: true })
		],
		ceiling: true,
		spriteLimit: true
	},
	{
		name: 'Yuba Lake',
		objset: 0x02,
		area: 0x05,
		submap: 0x01
	},
	{
		name: 'Dead River to Brahm',
		objset: 0x02,
		area: 0x06,
		submap: 0,
		deadRiverToBrahm: true,
		actors: [
			enemy.lizardman(0x04, 0x0B, 0x04, 0x6089),
			enemy.lizardman(0x08, 0x0B, 0x04, 0x608D),
			npc.ferryMan(0x12, 0x0C, 0x01, 0x6091),
			enemy.fishman(0x18, 0x0C, 0x04, 0x6095),
			enemy.fishman(0x1C, 0x0C, 0x04, 0x6099)
		]
	},
	{
		name: 'Dead River - Part 2',
		objset: 0x02,
		area: 0x07,
		submap: 0,
		deadRiverToAlba: true,
		actors: [
			enemy.lizardman(0x04, 0x0B, 0x04, 0x6089),
			enemy.lizardman(0x08, 0x0B, 0x04, 0x608D),
			npc.ferryMan(0x12, 0x0C, 0x01, 0x6091),
			enemy.fishman(0x18, 0x0C, 0x04, 0x6095),
			enemy.fishman(0x1C, 0x0C, 0x04, 0x6099)
		]
	},
	{
		name: 'Dead River - Part 1',
		objset: 0x02,
		area: 0x07,
		submap: 0x01,
		actors: [
			enemy.fishman(0x04, 0x0C, 0x04, 0x609E),
			enemy.fishman(0x08, 0x0C, 0x04, 0x60A2),
			npc.ferryMan(0x0E, 0x0C, 0x00, 0x60A6),
			enemy.lizardman(0x18, 0x0B, 0x04, 0x60AA),
			enemy.lizardman(0x1A, 0x0B, 0x04, 0x60AE)
		]
	},
	{
		name: 'Belasco Marsh',
		objset: 0x02,
		area: 0x07,
		submap: 0x02,
		actors: [
			enemy.leech(0x06, 0x0D, 0x04, 0x60B3, { marshPos: 0x0C }),
			// low priority sprite
			enemy.mudman(0x0A, 0x0C, 0x04, 0x60BB),
			enemy.mudman(0x0C, 0x0C, 0x04, 0x60BF),
			// low priority sprite
			enemy.mudman(0x16, 0x0C, 0x04, 0x60C7),
			enemy.wolf(0x1D, 0x08, 0x04, 0x60CB),
			enemy.wolf(0x28, 0x0A, 0x04, 0x60CF),
			enemy.lizardman(0x2C, 0x0C, 0x04, 0x60D3),
			enemy.lizardman(0x34, 0x0C, 0x04, 0x60D7),
			enemy.lizardman(0x38, 0x0C, 0x04, 0x60DB)
		]
	},
	{
		name: 'North Bridge',
		objset: 0x02,
		area: 0x08,
		submap: 0,
		actors: [
			enemy.skeleton(0x08, 0x09, 0x0F, 0x60E0),
			enemy.skeleton(0x0C, 0x09, 0x0F, 0x60E4),
			enemy.fishman(0x0E, 0x0C, 0x0F, 0x60E8, { ground: 0x09 }),
			enemy.fishman(0x15, 0x0C, 0x0F, 0x60EC, { ground: 0x0B }),
			// block
			enemy.fishman(0x1A, 0x0C, 0x0F, 0x60F4, { ground: 0x0B }),
			enemy.fishman(0x25, 0x0C, 0x0F, 0x60F8, { ground: 0x0B }),
			// block
			enemy.fishman(0x2A, 0x0C, 0x0F, 0x6100, { ground: 0x0B }),
			enemy.skeleton(0x34, 0x09, 0x0F, 0x6104),
			enemy.fishman(0x35, 0x0C, 0x0F, 0x6108, { ground: 0x09 }),
			enemy.skeleton(0x38, 0x0A, 0x0F, 0x610C)
		]
	},
	{
		name: 'Dora Woods - Part 1',
		objset: 0x02,
		area: 0x08,
		submap: 0x01,
		actors: [
			enemy.lizardman(0x04, 0x0A, 0x0F, 0x6111),
			enemy.lizardman(0x08, 0x0A, 0x0F, 0x6115),
			enemy.lizardman(0x0C, 0x0B, 0x0F, 0x6119),
			// low priority sprite
			enemy.lizardman(0x18, 0x0C, 0x0F, 0x6121),
			enemy.lizardman(0x1C, 0x08, 0x0F, 0x6125)
		]
	},
	{
		name: 'Dora Woods - Part 2',
		objset: 0x02,
		area: 0x08,
		submap: 0x02,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x0F, 0x612A, { stairs: true }),
			enemy.skeleton(0x08, 0x0B, 0x0F, 0x612E),
			enemy.skeleton(0x0C, 0x0C, 0x0F, 0x6132),
			enemy.skeleton(0x14, 0x0A, 0x0F, 0x6136),
			// low priority sprite
			enemy.skeleton(0x18, 0x0A, 0x0F, 0x613E)
		]
	},
	{
		name: 'Dora Woods - Part 3',
		objset: 0x02,
		area: 0x09,
		submap: 0
	},
	{
		name: 'Long Bridge to Bordia Mountains (Dead End Swamp)',
		objset: 0x02,
		area: 0x09,
		submap: 0x01,
		actors: [
			enemy.fishman(0x0C, 0x0C, 0x0F, 0x6143, { ground: 0x09 }),
			enemy.fishman(0x14, 0x0C, 0x0F, 0x6147, { ground: 0x09 }),
			enemy.fishman(0x18, 0x0C, 0x0F, 0x614B, { ground: 0x09 }),
			enemy.fishman(0x1C, 0x0C, 0x0F, 0x614F, { ground: 0x09 }),
			enemy.fishman(0x24, 0x0C, 0x0F, 0x6153, { ground: 0x09 }),
			enemy.fishman(0x28, 0x0C, 0x0F, 0x6157, { ground: 0x09 }),
			enemy.fishman(0x2C, 0x0C, 0x0F, 0x615B, { ground: 0x09 }),
			enemy.fishman(0x34, 0x0C, 0x0F, 0x615F, { ground: 0x09 })
		]
	},
	{
		name: 'Bordia Mountains (Dead End Swamp)',
		objset: 0x02,
		area: 0x09,
		submap: 0x02,
		actors: [
			enemy.skeleton(0x04, 0x0C, 0x0F, 0x6164),
			enemy.skeleton(0x08, 0x06, 0x0F, 0x6168, { stairs: true }),
			// low priority sprite
			enemy.mudman(0x0A, 0x0C, 0x0F, 0x6170),
			enemy.skeleton(0x12, 0x06, 0x0F, 0x6174),
			// low priority sprite
			enemy.mudman(0x1A, 0x0C, 0x0F, 0x617C),
			enemy.skeleton(0x23, 0x06, 0x0F, 0x6180),
			// low priority sprite
			enemy.mudman(0x2A, 0x0C, 0x0F, 0x6188),
			// low priority sprite
			enemy.mudman(0x38, 0x0C, 0x0F, 0x6190)
		]
	},
	{
		name: 'Camilla Cemetery',
		objset: 0x03,
		area: 0,
		submap: 0,
		actors: [
			npc.secretMerchant(0x04, 0x0C, 0x06, 0x6F32, {
				bank: 1,
				text: 'i\'ll give\nyou this\nsilver knife\nto save your\nneck.',
				textPointer: 0xCED8,
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && GARLIC',
					standard: 'GARLIC',
					glitch: 'GARLIC',
					diamondWarp: 'GARLIC',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && GARLIC',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && GARLIC'
				},
				code: {
					loc: {
						rom: 0x6E22 + 4,
						ram: 0xAE12 + 4
					},
					length: 6
				}
			}),
			enemy.deadHand(0x08, 0x0B, 0x08, 0x6F36),
			enemy.deadHand(0x0C, 0x0B, 0x08, 0x6F3A),
			// low priority sprite
			enemy.blob(0x24, 0x0C, 0x08, 0x6F42),
			enemy.blob(0x28, 0x0B, 0x08, 0x6F46),
			// low priority sprite
			enemy.deadHand(0x34, 0x0B, 0x08, 0x6F4E),
			enemy.deadHand(0x38, 0x0B, 0x08, 0x6F52),
			enemy.deadHand(0x3C, 0x0B, 0x08, 0x6F56)
		],
		spriteLimit: true
	},
	{
		name: 'Joma Marsh - Part 1',
		objset: 0x03,
		area: 0,
		submap: 0x01,
		actors: [
			enemy.skeleton(0x04, 0x0C, 0x0F, 0x6F5B),
			enemy.highJumpLeech(0x0C, 0x0D, 0x0F, 0x6F5F, { marshPos: 0x0C }),
			// low priority sprite
			enemy.swampGhoul(0x14, 0x0C, 0x0F, 0x6F67),
			// low priority sprite
			enemy.highJumpLeech(0x1C, 0x0D, 0x0F, 0x6F6F, { marshPos: 0x0C }),
			enemy.highJumpLeech(0x24, 0x0D, 0x0F, 0x6F73, { marshPos: 0x0C }),
			// low priority sprite
			enemy.swampGhoul(0x2C, 0x0C, 0x0F, 0x6F7B),
			enemy.highJumpLeech(0x34, 0x0D, 0x0F, 0x6F7F, { marshPos: 0x0C })
			// low priority sprite
		]
	},
	{
		name: 'Storigoi Graveyard (Blob Boost)',
		objset: 0x03,
		area: 0x01,
		submap: 0,
		actors: [
			npc.secretMerchant(0x04, 0x0C, 0x02, 0x6F88, {
				bank: 1,
				text: 'i\'ll give\nyou a silk\nbag.',
				textPointer: 0xCEBE,
				duck: true,
				code: {
					loc: {
						rom: 0x6E17,
						ram: 0xAE07
					},
					length: 6
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && GARLIC',
					standard: 'GARLIC',
					glitch: 'GARLIC',
					diamondWarp: 'GARLIC',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && GARLIC',
					morningStar: 'THORN_WHIP && CHAIN_WHIP && MORNING_STAR && GARLIC'
				}
			}),
			enemy.deadHand(0x0A, 0x0B, 0x08, 0x6F8C),
			enemy.deadHand(0x0C, 0x0B, 0x08, 0x6F90),
			// low priority sprite
			enemy.blob(0x14, 0x09, 0x08, 0x6F98),
			enemy.skeleton(0x18, 0x09, 0x08, 0x6F9C),
			enemy.blob(0x1C, 0x0A, 0x08, 0x6FA0),
			enemy.skeleton(0x24, 0x0B, 0x08, 0x6FA4),
			enemy.boneDragon(0x28, 0x0C, 0x08, 0x6FA8),
			enemy.boneDragon(0x2C, 0x0C, 0x08, 0x6FAC),
			// low priority sprite
			enemy.deadHand(0x34, 0x0B, 0x08, 0x6FB4),
			enemy.deadHand(0x38, 0x0B, 0x08, 0x6FB8),
			enemy.deadHand(0x3C, 0x0B, 0x08, 0x6FBC)
		],
		spriteLimit: true
	},
	{
		name: 'Sadam Woods - Part 2',
		objset: 0x03,
		area: 0x02,
		submap: 0,
		actors: [
			enemy.skeleton(0x04, 0x0A, 0x04, 0x6FC1),
			enemy.grabber(0x08, 0x0C, 0x04, 0x6FC5),
			// low priority sprite
			enemy.skeleton(0x0C, 0x0C, 0x04, 0x6FCD),
			enemy.grabber(0x14, 0x0C, 0x04, 0x6FD1),
			enemy.grabber(0x18, 0x0A, 0x04, 0x6FD5),
			enemy.skeleton(0x1C, 0x0A, 0x04, 0x6FD9, { stairs: true })
		]
	},
	{
		name: 'Sadam Woods - Part 1',
		objset: 0x03,
		area: 0x02,
		submap: 0x01,
		actors: [
			enemy.skeleton(0x04, 0x08, 0x04, 0x6FDE),
			enemy.boneDragon(0x08, 0x0C, 0x04, 0x6FE2),
			enemy.boneDragon(0x0C, 0x0C, 0x04, 0x6FE6),
			enemy.blob(0x14, 0x0C, 0x04, 0x6FEA),
			enemy.blob(0x18, 0x0C, 0x04, 0x6FEE)
		]
	},
	{
		name: 'Joma Marsh - Part 2',
		objset: 0x03,
		area: 0x03,
		submap: 0,
		actors: [
			// low priority sprite
			enemy.highJumpLeech(0x0C, 0x0D, 0x0F, 0x722F, { marshPos: 0x0C }),
			enemy.swampGhoul(0x14, 0x0C, 0x0F, 0x7233),
			// low priority sprite
			enemy.highJumpLeech(0x1C, 0x0D, 0x0F, 0x723B, { marshPos: 0x0C }),
			enemy.highJumpLeech(0x24, 0x0D, 0x0F, 0x723F, { marshPos: 0x0C }),
			// low priority sprite
			enemy.swampGhoul(0x2C, 0x0C, 0x0F, 0x7247),
			enemy.highJumpLeech(0x34, 0x0D, 0x0F, 0x724B, { marshPos: 0x0C })
			// low priority sprite
		]
	},
	{
		name: 'Joma Marsh - Part 3 (Fire and Skulls)',
		objset: 0x03,
		area: 0x03,
		submap: 0x01,
		actors: [
			enemy.fireGhoul(0x04, 0x0C, 0x0F, 0x7254),
			enemy.floatingSkull(0x08, 0x0C, 0x0F, 0x7258, { ground: 0x0C }),
			enemy.fireGhoul(0x0C, 0x0C, 0x0F, 0x725C),
			enemy.floatingSkull(0x14, 0x0B, 0x0F, 0x7260, { ground: 0x0B }),
			enemy.fireGhoul(0x18, 0x0C, 0x0F, 0x7264),
			enemy.floatingSkull(0x1C, 0x0B, 0x0F, 0x7268, { ground: 0x0B }),
			// block
			// block
			// block
			// block
			enemy.floatingSkull(0x34, 0x0C, 0x0F, 0x727C, { ground: 0x0C }),
			enemy.fireGhoul(0x38, 0x0D, 0x0F, 0x7280),
			fixture.book(0x3A, 0x0D, 0x11, 0x7284, {
				text: 'dracula\'s\nevil knife\nblurs\ncamilla\'s\nvision.',
				textPointer: 0xCF0B,
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL || EYEBALL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS)',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && ((DIAMOND && MAGIC CROSS) || RED_CRYSTAL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL) && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.floatingSkull(0x3C, 0x0D, 0x0F, 0x7288, { ground: 0x0D })
		]
	},
	{
		name: 'Debious Woods - Part 3',
		objset: 0x03,
		area: 0x03,
		submap: 0x02,
		actors: [
			enemy.skeleton(0x04, 0x08, 0x0F, 0x728D),
			enemy.skeleton(0x04, 0x22, 0x0F, 0x7291),
			enemy.skeleton(0x08, 0x10, 0x0F, 0x7295),
			enemy.skeleton(0x0C, 0x06, 0x0F, 0x7299),
			enemy.floatingSkull(0x0C, 0x14, 0x0F, 0x729D, { ground: 0x14 }),
			enemy.skeleton(0x0C, 0x1C, 0x0F, 0x72A1),
			enemy.skeleton(0x0C, 0x22, 0x0F, 0x72A5),
			enemy.skeleton(0x14, 0x08, 0x0F, 0x72A9),
			enemy.floatingSkull(0x14, 0x14, 0x0F, 0x72AD, { ground: 0x14 }),
			npc.crystalDude(0x16, 0x28, 0x05, 0x72B1, {
				bank: 1,
				text: 'i\'ll give\nyour morning\nstar power\nto burn away\nevil.',
				textPointer: 0xCE89,
				code: {
					loc: {
						rom: 0x4C82 + 4,
						ram: 0x8C72 + 4
					},
					length: 10
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					standard: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL',
					glitch: '(HOLY_WATER || NAIL) && ((WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL) || LAURELS)',
					diamondWarp: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && ((DIAMOND && MAGIC_CROSS) || RED_CRYSTAL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL)',
					morningStar: '(HOLY_WATER || NAIL) && WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.skeleton(0x18, 0x22, 0x0F, 0x72B5),
			enemy.skeleton(0x1C, 0x1A, 0x0F, 0x72B9),
			// block
			enemy.skeleton(0x24, 0x06, 0x0F, 0x72C1),
			enemy.floatingSkull(0x24, 0x1A, 0x0F, 0x72C5, { ground: 0x1A }),
			// block
			enemy.skeleton(0x28, 0x0A, 0x0F, 0x72CD),
			enemy.floatingSkull(0x28, 0x1A, 0x0F, 0x72D1, { ground: 0x1A }),
			// block
			// block
			enemy.skeleton(0x34, 0x0E, 0x0F, 0x72DD),
			enemy.skeleton(0x34, 0x1A, 0x0F, 0x72E1),
			enemy.skeleton(0x38, 0x08, 0x0F, 0x72E5),
			enemy.skeleton(0x38, 0x24, 0x0F, 0x72E9),
			enemy.skeleton(0x3C, 0x14, 0x0F, 0x72ED)
		],
		ceiling: true,
		spriteLimit: true
	},
	{
		name: 'Debious Woods - Part 2',
		objset: 0x03,
		area: 0x03,
		submap: 0x03
	},
	{
		name: 'Debious Woods - Part 1',
		objset: 0x03,
		area: 0x03,
		submap: 0x04
	},
	{
		name: 'Sadam Woods - Part 3',
		objset: 0x03,
		area: 0x04,
		submap: 0,
		actors: [
			enemy.blob(0x08, 0x0C, 0x02, 0x6FF3),
			enemy.blob(0x0C, 0x0C, 0x02, 0x6FF7),
			enemy.blob(0x14, 0x0C, 0x02, 0x6FFB),
			enemy.blob(0x1A, 0x0A, 0x02, 0x6FFF)
		]
	},
	{
		name: 'Vrad Mountain - Part 2 (Diamond Dude)',
		objset: 0x04,
		area: 0,
		submap: 0,
		actors: [
			npc.crystalDude(0x04, 0x0A, 0x00, 0x684F, {
				bank: 1,
				text: 'i\'ll give\nyou a\ndiamond.',
				textPointer: 0xCF38,
				code: {
					loc: {
						rom: 0x6A4A + 4, //  offset to account for checkId
						ram: 0xAA3A + 4
					},
					length: 6
				},
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL && HEART',
					standard: 'HEART',
					glitch: 'HEART',
					diamondWarp: 'HEART',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && HEART',
					morningStar: 'HEART && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			enemy.medusa(0x14, 0x0C, 0x04, 0x6853, { ground: 0x0C }),
			enemy.medusa(0x18, 0x0A, 0x04, 0x6857, { ground: 0x0A }),
			enemy.flower(0x1C, 0x0A, 0x04, 0x685B),
			enemy.ghost(0x24, 0x0A, 0x04, 0x685F, { ground: 0x0B }),
			enemy.ghost(0x2C, 0x0A, 0x04, 0x6863, { ground: 0x0C, groundX: 0x2A }),
			enemy.eagle(0x34, 0x0B, 0x04, 0x6867, { ground: 0x0B }),
			enemy.mummy(0x38, 0x0C, 0x04, 0x686B),
			enemy.eagle(0x3C, 0x0B, 0x04, 0x686F, { ground: 0x0B })
		]
	},
	{
		name: 'Vrad Mountain - Part 1',
		objset: 0x04,
		area: 0,
		submap: 0x01,
		actors: [
			// block
			// block
			// block
			// block
			// block
			// block
			// block
			// block
		]
	},
	{
		name: 'Deborah Cliff (In Tornado)',
		objset: 0x04,
		area: 0x01,
		submap: 0
	},
	{
		name: 'Jam Wasteland (Deborah Cliff)',
		objset: 0x04,
		area: 0x01,
		submap: 0x01,
		actors: [
			fixture.book(0x06, 0x0B, 0x14, 0x6895, {
				text: 'dracula\'s\nnail may\nsolve\nthe evil\nmystery.',
				textPointer: 0xCF68,
				requirements: {
					beginner: 'HOLY_WATER && THORN_WHIP && WHITE_CRYSTAL',
					standard: '(HOLY_WATER || EYEBALL && NAIL)',
					glitch: '(HOLY_WATER || EYEBALL || NAIL)',
					diamondWarp: '(HOLY_WATER || EYEBALL || NAIL)',
					redCrystal: 'WHITE_CRYSTAL && BLUE_CRYSTAL && RED_CRYSTAL && (HOLY_WATER || NAIL || EYEBALL)',
					morningStar: '(HOLY_WATER || EYEBALL) && THORN_WHIP && CHAIN_WHIP && MORNING_STAR'
				}
			}),
			// block
			// block
			// block
			enemy.mummy(0x24, 0x0C, 0x08, 0x68A5),
			enemy.mummy(0x28, 0x0B, 0x08, 0x68A9),
			enemy.mummy(0x2C, 0x0C, 0x08, 0x68AD),
			enemy.ghost(0x34, 0x0A, 0x08, 0x68B1, { ground: 0x0B }),
			enemy.ghost(0x38, 0x0A, 0x08, 0x68B5, { ground: 0x0C })
		]
	},
	{
		name: 'Wicked Ditch',
		objset: 0x04,
		area: 0x02,
		submap: 0,
		actors: [
			enemy.mummy(0x08, 0x0C, 0x08, 0x68BA),
			enemy.mummy(0x0C, 0x0B, 0x08, 0x68BE),
			enemy.mummy(0x14, 0x0C, 0x08, 0x68C2),
			enemy.mummy(0x18, 0x0A, 0x08, 0x68C6),
			enemy.flower(0x1C, 0x0A, 0x08, 0x68CA),
			enemy.harpy(0x24, 0x0C, 0x08, 0x68CE, { ground: 0x0C }),
			enemy.harpy(0x28, 0x0C, 0x08, 0x68D2, { ground: 0x0C }),
			enemy.harpy(0x2C, 0x0C, 0x08, 0x68D6, { ground: 0x0C }),
			enemy.medusa(0x34, 0x0C, 0x08, 0x68DA, { ground: 0x0C }),
			enemy.medusa(0x38, 0x0B, 0x08, 0x68DE, { ground: 0x0B })
		]
	},
	{
		name: 'Vrad Graveyard',
		objset: 0x04,
		area: 0x03,
		submap: 0,
		actors: [
			enemy.mummy(0x08, 0x0C, 0x0F, 0x68E3),
			enemy.mummy(0x0C, 0x0C, 0x0F, 0x68E7),
			enemy.eagle(0x14, 0x0C, 0x0F, 0x68EB, { ground: 0x0C }),
			enemy.mummy(0x18, 0x0C, 0x0F, 0x68EF),
			enemy.eagle(0x1C, 0x0C, 0x0F, 0x68F3, { ground: 0x0C }),
			enemy.ghost(0x24, 0x0A, 0x0F, 0x68F7, { ground: 0x0D }),
			enemy.ghost(0x28, 0x0A, 0x0F, 0x68FB, { ground: 0x0D }),
			enemy.ghost(0x2C, 0x0A, 0x0F, 0x68FF, { ground: 0x0A }),
			enemy.ghost(0x34, 0x0A, 0x0F, 0x6903, { ground: 0x0D })
		]
	},
	{
		name: 'Castlevania Bridge',
		objset: 0x04,
		area: 0x03,
		submap: 0x01
	},
	{
		name: 'Castlevania',
		objset: 0x05,
		area: 0,
		submap: 0
	},
	{
		name: 'Castlevania - Dracula Fight',
		objset: 0x05,
		area: 0,
		submap: 0x01,
		boss: true,
		actors: [
			// no dracula???
		]
	}
];

core.forEach(c => {
	c.actors && c.actors.forEach(a => {
		a.objset = c.objset;
		a.area = c.area;
		a.submap = c.submap;
		a.locationName = c.name;
	});
});

// get actor by filter criteria
core.getActor = function getActor(filter) {
	for (let i = 0; i < core.length; i++) {
		if (!core[i].actors) { continue; }
		for (let j = 0; j < core[i].actors.length; j++) {
			const actor = core[i].actors[j];
			if (_.some([actor], filter)) {
				return actor;
			}
		}
	}
};

module.exports = core;
