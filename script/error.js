// NO OPTION FOR THE COMMAND
function noOption(channel, cmd) {
	channel.send(`No option given for the command **!pp ${cmd}**`);
}

// COMMAND DOES NOT EXIST
function noCommand(channel, cmd) {
	channel.send(`Command **${cmd}** doesn't exist`);
}

module.exports = { noOption, noCommand };
