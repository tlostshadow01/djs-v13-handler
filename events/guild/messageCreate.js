//Import Modules
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const settings = require(`../../botconfig/settings.json`);
const { onCoolDown, replacemsg } = require("../../handlers/functions");
const Discord = require("discord.js");


module.exports = async (client, message) => {

const db = 

require("quick.db");
    
  var en = require("../../language/english");

  var tr = require("../../language/turkish");

 var dil = db.fetch(`language_${message.guild.id}`);

  if (dil == "en") {

    var lang = en;

  }

  if (!dil) {

    var lang = tr;

  }
    
    if(!message.guild || !message.channel || message.author.bot) return;
    if(message.channel.partial) await message.channel.fetch();
    if(message.partial) await message.fetch();
    
 let prefix = db.get(`prefix_${message.guild.id}`);

	if(prefix === null) prefix = config.prefix;
    
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if(!prefixRegex.test(message.content)) return;
    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;
    if(cmd.length == 0){
        if(mPrefix.includes(client.user.id)){
            message.reply({embeds: [new Discord.MessageEmbed().setColor(ee.color).setFooter(ee.footertext, ee.footericon).setTitle(`:thumbsup: **My Prefix here, is __\`${prefix}\`__**`)]})
        }
        return;
    }
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        
        

        //Check if user is on cooldown with the cmd, with Function from /handlers/functions.js
        if (onCoolDown(message, command)) {
          return message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)

              .setTitle(replacemsg(lang.system.cooldown, {
                prefix: prefix,
                command: command,
                timeLeft: onCoolDown(message, command)
              }))
   
              ]
          });
        }
        try {
          //if Command has specific permission return error
          if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.permissions.has(command.memberpermissions)) {
            return message.reply({ embeds: [new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                /*.setFooter(ee.footertext, ee.footericon)*/
                
                .setDescription(replacemsg(dil.sistem.yetki, {
                  command: command,
                  prefix: prefix
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.memberpermissions)}).catch((e) => {console.log(String(e).grey)});
          }
          //if Command has specific needed roles return error
          if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              
              .setDescription(replacemsg(lang.system.rol, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.requiredroles)}).catch((e) => {console.log(String(e).grey)});
            
          }
          //if Command has specific users return error
          if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              
              .setDescription(replacemsg(lang.system.user, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.notallowed_to_exec_cmd.alloweduserids)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has minimum args, and user dont entered enough, return error
          if(command.minargs && command.minargs > 0 && args.length < command.minargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `${lang.system.usage}`  + command.usage : `${lang.system.wrong}`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.minargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args, and user enters too many, return error
          if(command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? `${lang.system.usage}` + command.usage : `${lang.system.wrong}`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxargs)}).catch((e) => {console.log(String(e).grey)});
          }
          
          //if command has minimum args (splitted with "++"), and user dont entered enough, return error
          if(command.minplusargs && command.minplusargs > 0 && args.join(" ").split("++").filter(Boolean).length < command.minplusargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `${lang.system.usage}` + command.usage : `${lang.system.wrong}`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.minplusargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args (splitted with "++"), and user enters too many, return error
          if(command.maxplusargs && command.maxplusargs > 0 && args.join(" ").split("++").filter(Boolean).length > command.maxplusargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? `${lang.system.usage} ` + command.usage : `${lang.system.wrong}`)]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, settings.timeout.maxplusargs)}).catch((e) => {console.log(String(e).grey)});
          }
          //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
          command.run(client, message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), prefix);
        } catch (error) {
          /*if (lang.system.array)*/ {
            return message.reply({
              embeds: [new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                
                .setTitle(replacemsg(lang.system.titlehata, {
                  prefix: prefix,
                  command: command
                }))
                .setDescription(replacemsg(lang.system.dschata

, {
                  error: error,
                  prefix: prefix,
                  command: command
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 4000)}).catch((e) => {console.log(String(e).grey)});
          }
        }
      } else //if the command is not found send an info msg
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            
            .setTitle(replacemsg(lang.system.unknow, {
              prefix: prefix
            }))]
        }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 4000)}).catch((e) => {console.log(String(e).grey)});
}



function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
