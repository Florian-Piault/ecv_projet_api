const Discord = require('discord.js');

// GENERAL HELP - ALL THE COMMANDS
function allCommands(channel) {
	let message = new Discord.MessageEmbed();
	message.setTitle('Available commands :');
	message.setColor([51, 175, 255]);
	message.setDescription(['!pp gif [keyword]', '!pp help [keyword]']);

	channel.send(message).then((msg) => {
		msg.react('◀️');
		msg.react('▶️');

		const filter = (react) =>
			react.emoji.name === '◀️' || react.emoji.name === '▶️';
		msg
			.awaitReactions(filter, { time: 5000 })
			.then((react) => {
				channel.send('cliqué');
			})
			.catch((err) => console.error(err));
	});
}

// CHECK WHICH OPTION WAS GIVEN
function oneCommand(channel, command) {
	switch (command) {
		case 'gif':
			helpGif(channel);
			break;
		default:
			channel.send(`Option **${command}** doesn't exist`);
			break;
	}
}

// AIDE DES COMMANDES

// AIDE GIF
function helpGif(channel) {
	let message = new Discord.MessageEmbed();
	message.setTitle('!pp gif [keyword]:');
	message.setColor([51, 175, 255]);
	message.setDescription(['Send a **keyword**-related GIF']);
	channel.send(message);
}

function helpPokemon(channel) {
	let message = new Discord.MessageEmbed();
	message.setTitle('!pp pokemon [keyword]:');
	message.setColor([51, 175, 255]);
	message.setDescription(['Information about pokemon']);
	channel.send(message);
}

module.exports = { allCommands, oneCommand, helpPokemon };
