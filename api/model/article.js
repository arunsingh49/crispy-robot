const mongoose = require('mongoose');
const { categorySchema } = require('./category');
const Joi = require('@hapi/joi');

const articleSchema = new mongoose.Schema({
	id: { type: Number },
	title: { type: String, required: true, maxlength: 150 },
	urlTitle: {
		type: String,
		required: true,
		maxlength: 150,
		index: { unique: true, dropDup: true },
	},
	category: {
		type: categorySchema,
	},
	body: { type: String, required: true },
	template: { type: String, maxlength: 100 },
	headerImageName: { type: String, maxlength: 500 },
	headerImageAltDesc: { type: String, maxlength: 500 },
	headerImagePath: { type: String, maxlength: 500 },
	headerImageWidth: { type: String, maxlength: 100 },
	headerImageHeight: { type: String, maxlength: 100 },
	headerThumbnailImageName: { type: String, maxlength: 500 },
	headerThumbnailImageAltDesc: { type: String, maxlength: 500 },
	headerThumbnailImagePath: { type: String, maxlength: 500 },
	headerThumbnailImageWidth: { type: String, maxlength: 100 },
	headerThumbnailImageHeight: { type: String, maxlength: 100 },
	createdOn: { type: String, default: Date.now },
	summary: { type: String, maxlength: 2000 },
	titleTag: { type: String, maxlength: 1000 },
	metaDesc: { type: String, maxlength: 1000 },
	nonAmpUrl: { type: String, maxlength: 500 },
	ampUrl: { type: String, maxlength: 500 },
	categoryDisplay: { type: Boolean, default: true },
	modifiedOn: { type: Date },
	relatedArticles: { type: String, maxlength: 500 },
});

function validateArticle(article) {
	const schema = Joi.object({
		id: Joi.number().min(0),
		title: Joi.string()
			.max(150)
			.required(),
		urlTitle: Joi.string()
			.max(150)
			.required(),
		categoryId: Joi.objectId(),
		body: Joi.string(),
		template: Joi.string().max(100),
		headerImageName: Joi.string().max(500),
		headerImageAltDesc: Joi.string().max(500),
		headerImagePath: Joi.string().max(500),
		headerImageWidth: Joi.string().max(100),
		headerImageHeight: Joi.string().max(100),
		headerThumbnailImageName: Joi.string().max(500),
		headerThumbnailImageAltDesc: Joi.string().max(500),
		headerThumbnailImagePath: Joi.string().max(500),
		headerThumbnailImageWidth: Joi.string().max(100),
		headerThumbnailImageHeight: Joi.string().max(100),
		createdOn: Joi.date(),
		summary: Joi.string().max(2000),
		titleTag: Joi.string().max(1000),
		metaDesc: Joi.string().max(1000),
		nonAmpUrl: Joi.string().max(500),
		ampUrl: Joi.string().max(500),
		categoryDisplay: Joi.boolean(),
		modifiedOn: Joi.date(),
		relatedArticles: Joi.string().max(500),
	});

	const schemas = Array.isArray(article) ? Joi.array().items(schema) : schema;

	return schemas.validate(article);
}

const Article = mongoose.model('article', articleSchema);

exports.Article = Article;
exports.validateArticle = validateArticle;
