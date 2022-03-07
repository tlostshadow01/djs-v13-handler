const { MessageEmbed } = require("discord.js");

const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "tic-tac-toe", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Eğlence", //the command category for helpcmd [OPTIONAL]

  aliases: ["tiktaktu"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "balık", //the command usage for helpcmd [OPTIONAL]

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
const { TicTacToe } = require('discord-gamecord')

const db = require("quick.db");

  var en = require("../../language/english");

  var tr = require("../../language/turkish");

  var dil = db.fetch(`language_${message.guild.id}`);

  if (dil == "en") {

    var lang = en;

  }

  if (!dil) {

    var lang = tr;

  }



new TicTacToe({

  message: message,

  slash_command: false,

  opponent: message.mentions.users.first(),

  embed: {

    title: 'Tic Tac Toe',

    overTitle: `
      ${lang.game.gg}`
      ,

    color: ee.color,

  },

  oEmoji: '🔵',

  xEmoji: '❌',

  blankEmoji: '➖',

  oColor: 'PRIMARY',

  xColor: 'DANGER',

  waitMessage: `${lang.game.wait}`,

  turnMessage: `${lang.game.sıra}`,

  askMessage: `${lang.game.davet}`,

  cancelMessage: `${lang.game.cancel}`,

  timeEndMessage: `${lang.game.timeend}`,

  drawMessage: `${lang.game.draw}`,

  winMessage: `${lang.game.win}`

,

  gameEndMessage: `${lang.game.end}

`,

}).startGame();
}}
