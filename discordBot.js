require('dotenv').config();

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Loguei porra`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
});