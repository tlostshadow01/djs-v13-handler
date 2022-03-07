const { MessageEmbed } = require("discord.js");
const { Snake } = require("discord-gamecord")
const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "yılan", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Eğlence", //the command category for helpcmd [OPTIONAL]

  aliases: ["yılan-oyunu"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "yılan", //the command usage for helpcmd [OPTIONAL]

  description: "Yılan oyunu oynarsın.", //the command description for helpcmd [OPTIONAL]

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
new Snake({

        message: message,

        embed: {

        title: 'Yılan Oyunu',

        color: ee.color,

        OverTitle: "Oyun Bitti",

        },

        snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },

        emojis: {

          board: '⬛',

          food: '🍎',

          up: '⬆️',

          right: '➡️',

          down: '⬇️',

          left: '⬅️',

        },
foods: ['🍎', '🍇', '🍊'],

  stopButton: 'Durdur',
        othersMessage: 'Sadece oyunu yazan kişi kullanabilir!',

      }).startGame();
}}
