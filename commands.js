const { CategoryChannel } = require('discord.js');
const fetch = require('node-fetch');

// command like '!pp something'
const START_CMD = new RegExp(/^!pp\s{1}[a-zA-Z]*/);

function checkMessage(msg) {
	if (START_CMD.test(msg.content)) {
		const CMD = msg.content.slice(4, msg.content.length);
		const CHANNEL = msg.channel;

		checkCommand(CHANNEL, CMD);
	}

	// sendGif(msg.channel, msg.content.slice(4, msg.content.length));
}

function checkCommand(channel, command) {
	const options = command.split(' ');

	switch (options[0]) {
		case 'gif':
			options[1]
				? sendGif(channel, options[1])
				: channel.send("Pas d'option donnée pour la commande *!pp gif*");
			break;
		default:
			channel.send(`Commande *${options[0]}* non existante`);
			break;
	}
}

function sendGif(channel, cmd) {
	fetch(`${process.env.TENOR_URL}key=${process.env.TENOR_TOKEN}&q=${cmd}`)
		.then((res) => res.json())
		.then((json) => channel.send(json.results[0].url))
		.catch((err) => console.error('Could not fetch gif', err));
}

module.exports = { checkMessage };
