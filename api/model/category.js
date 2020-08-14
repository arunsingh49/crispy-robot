const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

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
	relatedArticles: { type: String },
});

function validateCategory(category) {
	const schema = Joi.object({
		name: Joi.string()
			.max(150)
			.required(),
		url: Joi.string()
			.max(150)
			.required(),
		title: Joi.string().max(255),
		description: Joi.string().max(500),
		imgUrl: Joi.string()
			.max(500)
			.allow(''),
		relatedArticles: Joi.string()
			.max(1000)
			.allow(''),
	});

	const schemas = Array.isArray(category)
		? Joi.array().items(schema)
		: schema;

	return schemas.validate(category);
}

const Category = mongoose.model('Category', categorySchema);

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validate = validateCategory;
