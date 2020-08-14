const mongoose = require('mongoose');
const {
	mapContentToArticle,
	mapMobileAmpToArticle,
	mapMobileToArticle,
} = require('./controller/article');

// const {
// 	mapMobileToArticle,
// } = require('./controller/lswMobileContentToArticle');
const { Article } = require('./model/article');

const prepareData = async () => {
	const articles = await mapContentToArticle();

	// 1. to replace \"" at start and end of metaDescTag string
	articles.map((item) => {
		item.metaDescTag = item.metaDescTag.replace('"', '');
	});

	// truncate Article Collection and insert all the article documents to the Article collection
	await Article.deleteMany({});
	await Article.insertMany(articles);

	// 2. Add headerMobileImagePath, headerMobileImageWidth, headerMobileImageHeight and bodyMobileAmp from lswMobileContentsAmp
	await mapMobileAmpToArticle();

	// 3. Add bodyMobile from lswMobileContents
	await mapMobileToArticle();
	// to update tags property - to be fired on mongodb(from UI's like robomongo) --> db.getCollection('articles').updateMany({"category.url": {$in: ["garlic", "turmeric"]}}, {$set : {tags: ["herbs"]}})
	await Article.updateMany(
		{ 'category.url': { $in: ['garlic', 'turmeric'] } },
		{ $set: { tags: ['herbs'] } },
	);

	return articles;
};

prepareData()
	.then((res) => console.log('Success!'))
	.catch((ex) => console.log('Error', ex));
