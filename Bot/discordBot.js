require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

const guild = new Discord.Guild(client);

const prefix = '?';

client.on('ready', () => {
    console.log(`Loguei porra`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    msg.reply('pong');
  }
  else if (command === 'my-info'){
    const userId = msg.member.user.id;
    const username = msg.member.user.username;
    const userTag = msg.member.user.tag;
    msg.reply('\nyour id: ' + userId + '\n' + 'your username: ' + username + '\n' + 'your name and tag: ' + userTag);
  }

  else if (command === 'info') {
    if (!args[0]) {
      msg.reply("you didn't provide any users to get info! Try to mention the user you want.");
    }
    else if (msg.mentions.members.first().user.bot) {
      msg.reply("user cannot be a BOT!");
    }
    else {
      const userMentioned = msg.mentions.users.first();
      const userId = userMentioned.id;
      const username = userMentioned.username;
      const userTag = userMentioned.tag;
      msg.reply(`here's ` + username + `'s info:` + '\nid: ' + userId + '\n' + 'username: ' + username + '\n' + 'name and tag: ' + userTag);      
    }
    
  }

  else if (command === 'guild'){
    if (!args.length) {
      return msg.reply(`you didn't provide any args. You can use: info`);
    }
    else if (args[0]==='info') {
      const guildMembers = guild.members;
      const guildMemberCount = guild.memberCount;
      const guildName = guild.name;
      msg.reply('\navailable: ' + guild.available + '\nguild name:' + guildName + '\nmembers count: ' + guildMemberCount);
    }
    else if (args[0] === 'add') {
      if (!args[1]) {
        msg.reply("you didn't provide any users to add! Try to mention the user you want to add in this guild.");
      }
      else if (args[1]) {
        guild.addMember(msg.mentions.users.first());
      }
    }

  }
  else if (command === 'args-info') {
    if (!args.length) {
      return msg.reply(`you didn't provide any args`);
    }
    else if (args[0] === 'show') {
      msg.reply('\nCommand called: ' + command + "\nArguments: " + args);
    }
  }
  else {
    msg.reply('command not found!');
  }



});