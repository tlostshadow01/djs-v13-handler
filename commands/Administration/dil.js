const { MessageEmbed } = require("discord.js");

const db = require("quick.db");


const config = require("../../botconfig/config.json");

const ee = require("../../botconfig/embed.json");

const settings = require("../../botconfig/settings.json");

module.exports = {

  name: "dil", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Yetkili", //the command category for helpcmd [OPTIONAL]

  aliases: ["language","lang"], //the command aliases for helpcmd [OPTIONAL]

  cooldown: 3, //the command cooldown for execution & for helpcmd [OPTIONAL]

  usage: "help [Commandname]", //the command usage for helpcmd [OPTIONAL]

  description: "Returns all Commmands, or one specific command", //the command description for helpcmd [OPTIONAL]

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

var en = require("../../language/english");


  var tr = require("../../language/turkish");

  var dil = db.fetch(`language_${message.guild.id}`);

  if (dil == "en") {

    var lang = en;

  }

  

  if (!dil) {

    var lang = tr;

  }

  if (!args[0]) return message.reply({content: `${lang.dil.args0}`});

  if (args[0] == "değiştir" || args[0] == "set") {

    if (!args[1]) return message.reply({ content: `${lang.dil.args1}`});

    if (args[1] == "tr") {

      if (!dil) return message.reply({content: "Dil Zaten Türkçe Olarak Ayarlanmış"});

      db.delete(`language_${message.guild.id}`);

      return message.reply({ content: "Dil Başarıyla Türkçe Olarak Değiştirildi."});

    }


    if (args[1] == "en") {

      if (dil == en) return message.reply({ content: "Language Is Already Set To English"});

      db.set(`language_${message.guild.id}`, "en");

      return message.reply({ content: "Language Successfully Changed to English"});

    }

  }

  if (args[0] == "sıfırla" || args[0] == "reset") {

    db.delete(`language_${message.guild.id}`);

    return message.reply({content: "Dil Başarıyla Sıfırlandı."});

  }

  if (args[0] == "yardım" || args[0] == "help") {

    message.reply({content:`${lang.dil.help}`});

  }
        }}