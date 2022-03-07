//Import Modules
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
const { onCoolDown, replacemsg } = require("../../handlers/functions");
const Discord = require("discord.js");
module.exports = (client, interaction) => {
    const db = require("quick.db");

  var en = require("../../language/english");

  var tr = require("../../language/turkish");

 var dil = db.fetch(`language_{$message.guild.id}`);

  if (dil == "en") {

    var lang = en;

  }

  if (!dil) {

    var lang = tr;

  }
	const CategoryName = interaction.commandName;
	let command = false;
	try{
    	    if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
      		command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
    	    }
  	}catch{
    	    if (client.slashCommands.has("normal" + CategoryName)) {
      		command = client.slashCommands.get("normal" + CategoryName);
   	    }
	}
	if(command) {
		if (onCoolDown(interaction, command)) {
			  return interaction.reply({ephemeral: true,
				embeds: [new Discord.MessageEmbed()
				  .setColor(ee.wrongcolor)
				  
				  .setTitle(replacemsg(lang.system.cooldown, {
					prefix: prefix,
					command: command,
					timeLeft: onCoolDown(interaction, command)
				  }))]
			  });
			}
		//if Command has specific permission return error
        if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has(command.memberpermissions)) {
          return interaction.reply({ ephemeral: true, embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              
              .setDescription(replacemsg(lang.system.yetki, {
                command: command,
                prefix: prefix
              }))]
          });
        }
        //if Command has specific needed roles return error
        if (command.requiredroles && command.requiredroles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
          return interaction.reply({ ephemeral: true, embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            
            .setDescription(replacemsg(lang.cmd.rol, {
              command: command,
              prefix: prefix
			}))]
          })
        }
        //if Command has specific users return error
        if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(interaction.member.id)) {
          return message.channel.send({ ephemeral: true, embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription(replacemsg(lang.system.user, {
              command: command,
              prefix: prefix
            }))]
          });
        }
		//execute the Command
		command.run(client, interaction, interaction.member, interaction.guild)
	}
}
