 module.exports = { //if [OPTIONAL] it means, you don't need to type it!

  name: "prefix", //the Command Name [REQUIRED]

  category: "Yetkili", //the Command Category [OPTIONAL]

  aliases: [], //the command aliases [OPTIONAL]

  cooldown: 2, //the Command Cooldown (Default in /botconfig/settings.json) [OPTIONAL]

  usage: "embed <Title> ++ <Description>", //the Command usage [OPTIONAL]

  description: "Resends your Text in an embed", //the command description [OPTIONAL]

  memberpermissions: ["ADMINISTRATOR"], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]

  permissions: ["YÖNETİCİ"], // buraya yetkinin türkçesini yazın.

  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]

  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]

  minargs: 0, // minimum args for the message, 0 == none [OPTIONAL]

  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]

  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
const Discord = require("discord.js");
const db = require("quick.db");
      try {
      if (args[0] === "sıfırla") {

    if (!prefix) {

      message.channel.send({
embeds: [
        new Discord.MessageEmbed()

          .setDescription(

            `<a:neoncarpi:780444956849340416> Önek değiştirilmediği için sıfırlanamaz.`

          )

          .setColor("#0000c8")

      ]});

      return;

    }

    db.delete(`prefix_${message.guild.id}`);

    message.channel.send({
embeds: [
      new Discord.MessageEmbed()

        .setDescription(`Önek Sistemi, Sıfırlandı`)

        .setColor("#0000c8")
]
    });

    return;

  }

  if (!args[0])

    return message.channel.send({
embeds: [
      new Discord.MessageEmbed()

      .setDescription(

          `Önek Sistemi

Değiştirmek İçin: **${prefix}ön-ek <yeniönek>**

Sıfırlamak İçin: **${prefix}ön-ek sıfırla**`

        )

        .setColor("#0000c8")

    ]});

  db.set(`prefix_${message.guild.id}`, args[0]);

  message.channel.send({ embeds: [

    new MessageEmbed()

      .setDescription(

        `<a:yesil_onay:727045346852601908> Yeni Önek ${args[0]} olarak ayarlandı.

• Sıfırlamak için ${prefix}ön-ek sıfırla`

      )

      .setColor("#0000c8")

  ]});
    } catch (e) {

        console.log(String(e.stack).bgRed)

        return message.reply({embeds: [new MessageEmbed()

            .setColor(ee.wrongcolor)

            .setTitle(`❌ Hata | Bir hata oluştu.`)

            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)

        ]});

    }
}
}
