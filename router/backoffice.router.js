const express = require('express');

class RouterClass {
	constructor() {
		this.router = express.Router();
	}

	routes() {
		this.router.get('/', (request, response) => {
			return request ? request.json() : response.json();
		});

		this.router.get('/:endpoint', (request, response) => {
			console.log(request.params);
			return response.json();
		});
	}

	init() {
		this.routes();
		return this.router;
	}
}

module.exports = RouterClass;
