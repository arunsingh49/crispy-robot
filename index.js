const mongoose = require('mongoose');
const express = require('express');
const winston = require('winston');
const config = require('config');
require('express-async-errors');
const app = express();

require('./startup/logging')();
require('./startup/cors')(app);
require('./startup/db')();
require('./startup/validate')();
require('./startup/routes')(app);

// setup some production file serving
if (['production'].includes(process.env.NODE_ENV)) {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('client', 'website', 'build', 'index.html'));
	});
}

const port = process.env.PORT || config.get('defaultPort');
const server = app.listen(port, () => {
	winston.info(`App listening on ${port}`);
});

module.exports = server;
