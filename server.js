require('dotenv').config();
const express = require('express');

class Server {
	constructor() {
		this.server = express();
		this.port = process.env.PORT;
	}

	init() {
		this.server.use(express.static('./www'));
		this.server.use(express.json({ limit: '20mb' }));

		this.config();
	}

	config() {
		const Backrouter = require('./router/backoffice.router');
		const backRouter = new Backrouter();
		this.server.use('/', backRouter.init());

		this.launch();
	}

	launch() {
		this.server.listen(this.port, () => {
			console.log({
				node: `http://localhost:${this.port}`,
			});
		});
	}
}

const server = new Server();
server.init();
