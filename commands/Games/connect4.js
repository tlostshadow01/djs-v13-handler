const { MessageEmbed } = require("discord.js");
const { Connect4 } = require('discord-gamecord')


const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "connect4", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Elence", //the command category for helpcmd [OPTIONAL]

  aliases: ["dördünü-birleştir"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "pi", //the command usage for helpcmd [OPTIONAL]

  description: "Gives u information on how fast the Bot is", //the command description for helpcmd [OPTIONAL]

  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]

  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]

  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]

  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]

  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    
new Connect4({

        message: message,

        opponent: message.mentions.users.first(),

        embed: {

          title: 'Dördünü birleştir',

          color: ee.color,

        },

        emojis: {

          player1: '🔵',

          player2: '🟡'

        },

        turnMessage: '{emoji} | Şuan **{player}** sırası!',

        winMessage: '{emoji} | **{winner}** oyunu kazandı!',

        gameEndMessage: 'Oyun bitmedi :(',

        drawMessage: 'Berabere!',

        askMessage: ' {opponent}, {challenger} seni dördünü birleştir oyununa davet etti',

        cancelMessage: 'Oyun isteği reddedildi.',

        timeEndMessage: 'Rakip için beklenilen süre doldu.',


      }).startGame();
    
    }}
