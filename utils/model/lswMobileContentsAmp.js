const mongoose = require('mongoose');
const collectionName = 'lswMobileContentsAmp';

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
		c_header_mobile_image_name: { type: String },
		c_header_mobile_image_width: { type: String },
		c_header_mobile_image_height: { type: String },
	},
	{ collection: collectionName },
);

module.exports.lswMobileContentsAmp = wellnezGCPLive.model(
	collectionName,
	lswMobileContentAmpSchema,
);
