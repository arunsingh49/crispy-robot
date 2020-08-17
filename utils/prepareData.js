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

async function replaceItems() {
	const articles = await Article.find({});
	console.log('articles', articles);
	articles.map((item) => {
		item.metaDescTag = item.metaDescTag.replace('"', '');
		item.headerImageAltDesc = item.headerImageAltDesc.replace('"', '');
		item.headerImagePath = item.headerImagePath.replace(
			'http://www.wellnez.in/wellnez/img/blog-img',
			'http://localhost:9000/public/images',
		);
		item.headerThumbnailImagePath = item.headerThumbnailImagePath.replace(
			'http://www.wellnez.in/wellnez/img/blog-img',
			'http://localhost:9000/public/images',
		);
		item.headerMobileImagePath = item.headerMobileImagePath.replace(
			'http://www.wellnez.in/wellnez/img/blog-img',
			'http://localhost:9000/public/images',
		);
		item.body = item.body.replace(
			'http://www.wellnez.in/wellnez/img/blog-img',
			'http://localhost:9000/public/images',
		);
		item.bodyMobileAmp = item.bodyMobileAmp.replace(
			'http://www.wellnez.in/wellnez/img/blog-img',
			'http://localhost:9000/public/images',
		);
	});
	await Article.deleteMany({});
	await Article.insertMany(articles);
}

prepareData()
	.then((res) => {
		console.log('Success!');
	})
	.catch((ex) => console.log('Error prepareData(): ', ex));

replaceItems().then((res) => console.log('res', res));
