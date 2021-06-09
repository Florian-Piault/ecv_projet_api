const fetch = require('node-fetch');
const Discord = require('discord.js');

async function getInfo(channel, options) {
	const pokemon = await getPokemonInfo(channel, options[1].toLowerCase());
	if (!pokemon) return;

	// ATTRIBUTES
	const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
	const weight = pokemon.weight / 10;
	const height = pokemon.height / 10;
	const types = pokemon.types.map((t) => t.type.name);
	const sprites = pokemon.sprites.other['official-artwork'].front_default;

	// MESSAGE_EMBED
	let message = new Discord.MessageEmbed();
	message.setTitle(name);
	message.setThumbnail(sprites);
	message.addField('Weight', weight + ' kg');
	message.addField('Height', height + ' m');
	message.addField(types.length > 1 ? 'Types' : 'Type', types.join(', '));
	channel.send(message);
}

function getPokemonInfo(channel, pokemon) {
	return fetch(`${process.env.POKEAPI_URL}/pokemon/${pokemon}`)
		.then((data) => data.json())
		.catch(() => {
			channel.send(`Pokémon *${pokemon}* does not exist`);
			return null;
		});
}

module.exports = { getInfo };
