const { MessageEmbed } = require("discord.js");

const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "balık", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Eğlence", //the command category for helpcmd [OPTIONAL]

  aliases: ["balık"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "balık", //the command usage for helpcmd [OPTIONAL]

  description: "Balığı yakalama oyunu oynarsın.", //the command description for helpcmd [OPTIONAL]

  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]

  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]

  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]

  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]

  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {

const positions = {

			safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',

			danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',

			win: '_ _           :crown:**Kazandın.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',

			lose: '_ _           :skull:**Kaybettin.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',

		};

		let randomized = Math.floor(Math.random() * 2);

		let gameEnded = false;

		let randomPos = positions[Object.keys(positions)[randomized]];

		let data = 0;

		const componentsArray = [

			{

				type: 1,

				components: [

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'e',

						label: '\u200b',

						disabled: true,

					},

					{

						type: 2,

						style: 'PRIMARY',

						custom_id: String(Math.random()),

						emoji: { id: '890611575227023391' },

					},

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'ee',

						label: '\u200b',

						disabled: true,

					},

				],

			},

		];

		const msg = await message.channel.send({

			 embeds:[new MessageEmbed()
.setDescription(`3 Balık yakala ve kazan!\n\n${randomPos}`)
                     .setColor(ee.color)
]
			

		});

		const filter = (button => { return button.user.id === message.author.id; });

		const game = await message.channel.createMessageComponentCollector({

			filter,

			componentType: 'BUTTON',

		});

		function update(button) {

			randomized = Math.floor(Math.random() * 2);

			randomPos = positions[Object.keys(positions)[randomized]];

			if(data === 3) {

				gameEnded = true;

				game.stop();

				componentsArray[0].components[1].disabled = true;

				msg.edit({

					
                    
           embeds   : [new MessageEmbed() 
                       .setDescription(positions.win) .setColor(ee.color

)],
components: componentsArray,
				

				});

				button.reply({ content: 'GG! 3 balık yakaladın!' });

			}

			else if (data <= -9) {

				gameEnded = true;

				game.stop();

				componentsArray[0].components[1].disabled = true;

				

	

	

	

	

	

	

	

	

	
msg.edit({

					

                    

           embeds   : [new MessageEmbed() 

                       .setDescription(positions.lose) .setColor(ee.color

)],
components: componentsArray,
				

				});
	

	

	

	

	

				button.reply({ content: 'GG kaybettin.' });

			}

			else {

				if(button) return button.deferUpdate();

				msg.edit({

					
                    
                    embeds: [new MessageEmbed().setColor(ee.color).setDescription(randomPos + `           **${data}**`)],
                         
components: componentsArray,
					

				});

			}

		}

		setInterval(() => {

			if(gameEnded === false) return update();

		}, 2000);

		game.on('collect', async (button) => {

			if(randomized !== 0) {

				data -= 3;

				update(button);

			}

			else {

				data++;

				update(button);

			}
            }
                
)}}
		
