const exec = require('child_process').exec;
const Discord = require("discord.js");
var settings = require(`../../botconfig/settings.json`);
module.exports = {

  name: `exec`,

  category: `Owner`,

  aliases: ["cmd"],

  description: `Exec`,

  usage: `exec <CODE>`,

  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]

  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]

  alloweduserids: settings.ownerIDS, //Only allow specific Users to execute a Command [OPTIONAL]

  minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]

  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]

  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]

  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]

  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {

  

if (!args.join(" ")) return message.channel.send({ content: "Lütfen komutu boş bırakmayın."})

    exec(`${args.join(' ')}`, (error, stdout) => {

        const response = (error || stdout);

        let embed = new Discord.MessageEmbed()

            .setTitle(`Exec`)

            .addField("Giriş", `\`\`\`asciidoc\n${args.join(" ")}\n\`\`\``)

            .addField("Çıkış", `\`\`\`js\n${response}\n\`\`\``)

            .setColor('RED');

        message.channel.send({ embeds: [embed] });

    });
      }}