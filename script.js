require('dotenv').config();
const Discord = require('discord.js');
const Client = new Discord.Client();

Client.on('ready', () => {
	console.log('Logged in as ' + Client.user.tag);
});

Client.login(process.env.CLIENT_TOKEN);
