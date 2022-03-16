const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "help", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Bilgilendirme", //the command category for helpcmd [OPTIONAL]
  aliases: ["h", "commandinfo", "cmds", "cmd", "yardım"], //the command aliases for helpcmd [OPTIONAL]
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
      try{
        if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.reply({embeds: [embed.setColor(ee.wrongcolor).setDescription(`**${args[0].toLowerCase()}** komutu için bilgilendirme bulunamadı.`)]});
          }
          if (cmd.name) embed.addField("**Komut adı**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Hakkında detaylı bilgi:\`${cmd.name}\``);
          if (cmd.description) embed.addField("**Açıklama**", `\`${cmd.description}\``);
          if (cmd.aliases) embed.addField("**Diğer kullanımlar**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.cooldown) embed.addField("**Yavaşmod**", `\`${cmd.cooldown} Saniye\``);
          else embed.addField("**Yavaşmod**", `\`${settings.default_cooldown_in_sec} Second\``);
          if (cmd.usage) {
              embed.addField("**Kullanımı**", `\`${prefix}${cmd.usage}\``);
              embed.setFooter("Sözdizimi: <> = required, [] = optional");
          }
          return message.reply({embeds: [embed.setColor(ee.color)]});
        } else {
          const embed = new MessageEmbed()
              .setColor(ee.color)
              .setThumbnail(client.user.displayAvatarURL())
              .setTitle("YARDIM MENÜSÜ 🔰 Komutlar")
              .setFooter(`Tüm komutların açıklamasını ve bilgilendirmesini görmek için : ${prefix}yardım [KOMUT İSMİ] yazın`, client.user.displayAvatarURL());
          const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          };
          try {
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
              embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${items.join(", ")}`);
            }
          } catch (e) {
              console.log(String(e.stack).red);
          }
          message.reply({embeds: [embed]});
      }
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.reply({embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(`❌ Hata | Bir hata oluştu`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]});
    }
  }
}

