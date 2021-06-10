const Ytdl = require('discord-ytdl-core');

class PlayerClass {
	constructor() {
		this.queue = new Map();
	}

	async execute(message) {
		const args = message.content.split(' ');

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel)
			return message.channel.send(
				'You need to be in a voice channel to play music!',
			);
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
			return message.channel.send(
				'I need the permissions to join and speak in your voice channel!',
			);
		}

		const songInfo = await Ytdl.getInfo(args[2]);
		const song = {
			title: songInfo.videoDetails.title,
			url: songInfo.videoDetails.video_url,
		};

		if (this.queue.size === 0) {
			// Creating the contract for our queue
			const queueContruct = {
				textChannel: message.channel,
				voiceChannel: voiceChannel,
				connection: null,
				songs: [],
				volume: 5,
				playing: true,
			};
			// Setting the queue using our contract
			this.queue.set(message.guild.id, queueContruct);

			// Pushing the song to our songs array
			queueContruct.songs.push(song);

			try {
				// Here we try to join the voicechat and save our connection into our object.
				var connection = await voiceChannel.join();
				queueContruct.connection = connection;
				// Calling the play function to start a song
				this.play(message.guild, queueContruct.songs[0]);
			} catch (err) {
				// Printing the error message if the bot fails to join the voicechat
				this.queue.delete(message.guild.id);
				message.channel.send('could not join voice chat');
				console.log(err);
			}
		} else {
			this.queue.songs.push(song);
			// console.log(this.queue.songs);
			return message.channel.send(`${song.title} has been added to the queue!`);
		}
	}

	play(guild, song) {
		const serverQueue = this.queue.get(guild.id);

		if (!song) {
			serverQueue.voiceChannel.leave();
			this.queue.delete(guild.id);
			return;
		}
		console.log(song);
		const dispatcher = serverQueue.connection
			// .play('http://www.sample-videos.com/audio/mp3/wave.mp3');
			.play(Ytdl(song.url, {filter: "audioonly",fmt: "mp3"}))
			.on('finish', () => {
				serverQueue.songs.shift();
				this.play(guild, serverQueue.songs[0]);
				serverQueue.textChannel.send('Music\'s over');
			})
			.on('error', (error) => {
				serverQueue.textChannel.send('An error occured sorry');
				console.error('error in play', error)
			});
		dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
		serverQueue.textChannel.send(`Start playing: **${song.title}**`);
	}
}

module.exports = PlayerClass;
