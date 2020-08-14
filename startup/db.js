const mongoose = require('mongoose');
const winston = require('winston');
// const config = require('config');

module.exports = (app) => {
	// const db = config.get('db');
	// we can use the config setting also instead of the below if statement.
	let db = 'mongodb://localhost/wellnezAPI';
	if (process.env.NODE_ENV === 'test')
		db = 'mongodb://localhost/wellnezAPI_test';

	mongoose
		.connect(db, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => winston.info(`Connected to ${db} MongoDB`))
		.catch((ex) => winston.info(ex));

	// This is a workaround for the following message:
	// DeprecationWarning: collection.ensureIndex is deprecated.
	mongoose.set('useCreateIndex', true);
};
