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

const port = process.env.PORT || config.get('defaultPort');
const server = app.listen(port, () => {
	winston.info(`App listening on ${port}`);
});

module.exports = server;
