const winston = require('winston');

module.exports = () => {
	winston.configure({
		transports: [new winston.transports.File({ filename: 'logfile.log' })],
	});
	winston.exceptions.handle(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
	);

	process.on('unhandledRejection', (ex) => {
		throw ex;
	});
};
