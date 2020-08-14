const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Category, validate } = require('../model/category');
const _ = require('lodash');

router.get('/', async (req, res, next) => {
	const categories = await Category.find({});

	res.send(categories);
});

router.post('/', auth, async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return res.status(404).send(error);

	const category = new Category(
		_.pick(req.body, ['name', 'url', 'title', 'description', 'imgUrl']),
	);

	await category.save();

	res.send(category);
});

router.put('/:id', auth, async (req, res, next) => {
	const { error } = validate(req.body);
	if (error) return res.status(404).send(error.details);

	const categories = await Category.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			url: req.body.url,
			title: req.body.title,
			description: req.body.description,
			imgUrl: req.body.imgUrl,
		},
		{ new: true },
	);

	res.send(categories);
});

router.delete('/:id', async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('Invalid ID');

	const categories = await Category.findByIdAndRemove(req.params.id);

	res.send(categories);
});

router.get('/:id', async (req, res, next) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('Invalid ID');

	const category = await Category.findById(req.params.id);

	if (!category)
		return res
			.status(404)
			.send('Category with the given Id was not found.');

	res.send(category);
});

module.exports = router;
