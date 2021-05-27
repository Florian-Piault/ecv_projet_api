require('dotenv').config();
const Discord = require('discord.js');
const Client = new Discord.Client();
const Commands = require('./commands.js');

Client.on('ready', () => {
	console.log('Logged in as ' + Client.user.tag);
});

Client.on('message', (msg) => {
	Commands.checkMessage(msg);
});

Client.login(process.env.CLIENT_TOKEN);
