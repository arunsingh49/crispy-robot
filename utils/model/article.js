const mongoose = require('mongoose');
const categorySchema = require('./category');

const wellnezAPI = mongoose.createConnection('mongodb://localhost/wellnezAPI', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const articleSchema = mongoose.Schema({
	id: { type: Number },
	title: { type: String },
	urlTitle: { type: String },
	body: { type: String },
	bodyMobile: { type: String },
	bodyMobileAmp: { type: String },
	headerImagePath: { type: String },
	headerImageAltDesc: { type: String },
	headerImageWidth: { type: String },
	headerImageHeight: { type: String },
	headerMobileImagePath: { type: String },
	headerMobileImageWidth: { type: String },
	headerMobileImageHeight: { type: String },
	headerThumbnailImagePath: { type: String },
	headerThumbnailImageWidth: { type: String },
	headerThumbnailImageHeight: { type: String },
	createdOn: { type: String },
	summary: { type: String },
	titleTag: { type: String },
	metaDescTag: { type: String },
	nonAmpUrl: { type: String },
	ampUrl: { type: String },
	modifiedOn: { type: String },
	relatedArticles: { type: String },
	category: { type: categorySchema },
	relatedArticles: { type: String },
	tags: { type: Array },
});

module.exports.Article = wellnezAPI.model('article', articleSchema);
