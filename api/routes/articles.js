const mongoose = require('mongoose');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Article, validateArticle } = require('../model/article');
const { Category } = require('../model/category');
const _ = require('lodash');

const router = express.Router();

router.get('/count', async (req, res, next) => {
	let query = {};
	const category = req.query.category;
	if (category)
		query = { $or: [{ 'category.url': category }, { tags: [category] }] };

	const count = await Article.find(query).countDocuments();

	if (!count) return res.status(404).send('Article count zero');

	res.send({ count });
});

router.get('/', async (req, res, next) => {
	const pageNumber = parseInt(req.query.page);
	const pageSize = pageNumber ? parseInt(req.query.size) : undefined;

	let query = {};
	const category = req.query.category;
	if (category)
		// return articles as per category, if category is passed as query string
		query = { $or: [{ 'category.url': category }, { tags: [category] }] };

	const articles = await Article.find(query)
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize);

	if (!articles.length)
		return res
			.status(404)
			.send('Articles not found. Try changing the query');

	res.send(articles);
});

router.get('/:id', async (req, res, next) => {
	// return a single article by _id or urlTitle
	let article;
	const reqId = req.params.id;

	if (mongoose.Types.ObjectId.isValid(reqId))
		article = await Article.findById(reqId);
	else article = await Article.findOne({ urlTitle: reqId });

	if (!article)
		return res.status(404).send('Article with given id was not found.');

	res.send(article);
});

router.post('/', [auth, validate(validateArticle)], async (req, res, next) => {
	const category = await Category.findById(req.body.categoryId);
	if (!category) return res.status(400).send('Error: Invalid category');

	const article = new Article(
		_.pick(req.body, [
			'id',
			'title',
			'urlTitle',
			'body',
			'template',
			'headerImageName',
			'headerImageAltDesc',
			'headerImageWidth',
			'headerImageHeight',
			'headerThumbnailImageName',
			'headerThumbnailImageAltDesc',
			'headerThumbnailImageWidth',
			'headerThumbnailImageHeight',
			'createdOn',
			'summary',
			'titleTag',
			'metaDesc',
			'nonAmpUrl',
			'ampUrl',
			'categoryDisplay',
			'modifiedOn',
			'relatedArticles',
		]),
	);

	article.category = {
		_id: category._id,
		name: category.name,
		url: category.url,
	};

	await article.save();

	res.send(article);
});

router.put(
	'/:id',
	[auth, validate(validateArticle), validateObjectId],
	async (req, res, next) => {
		const article = await Article.findByIdAndUpdate(
			req.params.id,
			_.pick(req.body, [
				'id',
				'title',
				'urlTitle',
				'body',
				'template',
				'headerImageName',
				'headerImageAltDesc',
				'headerImageWidth',
				'headerImageHeight',
				'headerThumbnailImageName',
				'headerThumbnailImageAltDesc',
				'headerThumbnailImageWidth',
				'headerThumbnailImageHeight',
				'createdOn',
				'summary',
				'titleTag',
				'metaDesc',
				'nonAmpUrl',
				'ampUrl',
				'categoryDisplay',
				'modifiedOn',
				'relatedArticles',
			]),
			{ new: true },
		);

		res.send(article);
	},
);

router.delete('/:id', [auth, validateObjectId], async (req, res, next) => {
	const article = await Article.findByIdAndRemove(req.params.id);

	if (!article)
		return res
			.status(204)
			.send('Article with the given id not found in DB.');

	res.send(article);
});

module.exports = router;
