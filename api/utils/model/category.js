const mongoose = require('mongoose');

const wellnezAPI = mongoose.createConnection('mongodb://localhost/wellnezAPI', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const categorySchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
		index: { unique: true, dropDups: true },
	},
	title: { type: String },
	description: { type: String },
	imgUrl: { type: String },
});

module.exports.Category = wellnezAPI.model('Category', categorySchema);
