const mongoose = require('mongoose');
const collectionName = 'lswMobileContents';

const wellnezGCPLive = mongoose.createConnection(
	'mongodb://localhost/wellnezGCPLive',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
);

const lswMobileContentAmpSchema = new mongoose.Schema(
	{
		c_id: { type: Number },
		c_mobile_body: { type: String },
	},
	{ collection: collectionName },
);

module.exports.lswMobileContents = wellnezGCPLive.model(
	collectionName,
	lswMobileContentAmpSchema,
);
