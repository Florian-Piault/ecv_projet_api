require('dotenv').config();
const Discord = require('discord.js');
const Client = new Discord.Client();
const Commands = require('./script/commands.js');

Client.login(process.env.CLIENT_TOKEN);

Client.on('ready', () => {
	console.log('Logged in as ' + Client.user.tag);
});

Client.on('message', (msg) => {
	if (msg.author.bot) return;
	Commands.checkMessage(msg);
});
