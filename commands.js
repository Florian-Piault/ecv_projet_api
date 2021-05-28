const fetch = require('node-fetch');
const Helper = require('./helper');

// COMMAND LIKE '!pp something'
const START_CMD = new RegExp(/^!pp\s{1}[a-zA-Z]*/);

// CHECK IF THE MESSAGE CONTENT BEGINS WITH THE REGEX
function checkMessage(msg) {
	if (START_CMD.test(msg.content)) {
		const CMD = msg.content.slice(4, msg.content.length);
		const CHANNEL = msg.channel;

		checkCommand(CHANNEL, CMD);
	}
}

// CHECK WHICH COMMAND WAS SELECTED
function checkCommand(channel, command) {
	const options = command.split(' ');

	switch (options[0]) {
		case 'gif':
			options[1]
				? sendGif(channel, options[1])
				: channel.send('No option given for the **!pp gif** command');
			break;
		case 'help':
			options[1]
				? Helper.oneCommand(channel, options[1])
				: Helper.allCommands(channel);
			break;
		default:
			channel.send(`Command **${options[0]}** doesn't exist`);
			break;
	}
}

function sendGif(channel, keyword) {
	const randomNumber = Math.floor(Math.random() * 20);

	fetch(`${process.env.TENOR_URL}key=${process.env.TENOR_TOKEN}&q=${keyword}`)
		.then((res) => res.json())
		.then((json) => channel.send(json.results[randomNumber].url))
		.then(() => channel.send(`GIF by Tenor: **${keyword}**`))
		.catch((err) => console.error('Could not fetch gif', err));
}

module.exports = { checkMessage };
