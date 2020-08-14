const express = require('express');
const { Category } = require('../model/category');
const { Article } = require('../model/article');

const router = express.Router();

router.get('/:id', async (req, res, next) => {
	const category = await Category.findOne({ url: req.params.id });
	if (category) {
		// return if the related articles by category exist
		result = category;
	} else {
		// else return related articles by _id or urlTitle
		if (mongoose.Types.ObjectId.isValid(req.params.id)) {
			// _id
			result = await Article.findOne(
				{ _id: req.params.id },
				{ relatedArticles: 1, _id: 0 },
			);
		} else {
			// urlTitle
			result = await Article.findOne(
				{ urlTitle: req.params.id },
				{ relatedArticles: 1, _id: 0 },
			);
		}
	}

	if (!result)
		return res
			.status(404)
			.send('Data with the with the given id not found.');

	const arrArticleId = result.relatedArticles.split`,`.map((x) => +x);
	const articles = await Article.find({
		id: { $in: arrArticleId },
	});

	res.send(articles);
});

module.exports = router;
