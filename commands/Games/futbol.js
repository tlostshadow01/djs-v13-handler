const { MessageEmbed } = require("discord.js");

const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "futbol", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Eğlence", //the command category for helpcmd [OPTIONAL]

  aliases: ["futboll"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "futbol", //the command usage for helpcmd [OPTIONAL]

  description: "Gives u information on how fast the Bot is", //the command description for helpcmd [OPTIONAL]

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

			left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',

			middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',

			right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',

		};

		let randomized = Math.floor(Math.random() * Object.keys(positions).length);

		let gameEnded = false;

		let randomPos = positions[Object.keys(positions)[randomized]];

		const componentsArray = [

			{

				type: 1,

				components: [

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'left',

						label: 'Sol',

					},

					{

						type: 2,

						style: 'PRIMARY',

						custom_id: 'middle',

						label: 'Orta',

					},

					{

						type: 2,

						style: 'SECONDARY',

						custom_id: 'right',

						label: 'Sağ',

					},

				],

			},

		];

		const msg = await message.channel.send({

			content: randomPos,

			components: componentsArray,

		});

		function update() {

			randomized = Math.floor(Math.random() * Object.keys(positions).length);

			randomPos = positions[Object.keys(positions)[randomized]];

			msg.edit({

				content: randomPos,

				components: componentsArray,

			});

		}

		setInterval(() => {

			if(gameEnded == false) return update();

		}, 1000);

		const filter = button => {

			return button.user.id === message.author.id;

		};

		const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

		if(button.customId !== Object.keys(positions)[randomized]) {

			gameEnded = true;

			return button.reply({ content: 'You won!' });

		}

		else {

			gameEnded = true;

			return button.reply({ content: 'You lose...' });

		}

	},

};
 
