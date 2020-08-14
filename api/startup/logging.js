const winston = require('winston');

module.exports = () => {
	winston.configure({
		transports: [new winston.transports.File({ filename: 'logfile.log' })],
	});
	winston.handleExceptions(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
	);

	process.on('unhandledRejection', (ex) => {
		throw ex;
	});
};
