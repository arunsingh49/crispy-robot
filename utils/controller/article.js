const Fawn = require('fawn');
const { lswContent, articleAggregateQuery } = require('../model/lswContents');
const { lswMobileContents } = require('../model/lswMobileContents');
const { lswMobileContentsAmp } = require('../model/lswMobileContentsAmp');

const { Category } = require('../model/category');

Fawn.init('mongodb://localhost/wellnezAPI');

/***
	Get relevant properties from lswMobileContents collection and fill into the article object
***/
const getMobileContent = async () => {
	return await lswMobileContents.find(
		{},
		{
			_id: 0,
			c_id: 1,
			c_mobile_body: 1,
		},
	);
};

/***
	Get relevant properties from the lswMobileContentsAmp collection 
***/
const getMobileContentAmp = async () => {
	return await lswMobileContentsAmp.find(
		{},
		{
			_id: 0,
			c_id: 1,
			c_mobile_body: 1,
			c_header_mobile_image_name: 1,
			c_header_mobile_image_width: 1,
			c_header_mobile_image_height: 1,
		},
	);
};

/***
	Get all the required data from lswContents collection and fill into the article object. 
	This article object is similar (mapping done by articleAggregateQuery) to the Article schema.
	Return article object
***/
const mapContentToArticle = async () => {
	const articleIDs = await lswContent.find({}, { c_id: 1, _id: 0 });
	const articles = await lswContent.aggregate(
		articleAggregateQuery(articleIDs.map((id) => id.c_id)),
	);
	const categories = await Category.find({}, { _id: 1, url: 1, name: 1 });
	categories.forEach((cat) => {
		articles.map((article) => {
			if (cat.url === article.category)
				return (article.category = {
					_id: cat._id,
					name: cat.name,
					url: cat.url,
				});
		});
	});
	return articles;
};

/***
	Map data from lswMobileContents to articles
***/
const mapMobileToArticle = async () => {
	const mobileArticles = await getMobileContent();

	try {
		let task = new Fawn.Task();

		mobileArticles.map(
			(art) =>
				(task = task.update(
					'articles',
					{ id: art.c_id },
					{
						$set: {
							bodyMobile: art.c_mobile_body,
						},
					},
				)),
		);

		task.run();
	} catch (ex) {
		console.log('Error:', ex);
	}
};

/***
	Map data from lswMobileContentsAmp to articles
***/
const mapMobileAmpToArticle = async () => {
	const mobileArticlesAmp = await getMobileContentAmp();

	try {
		let task = new Fawn.Task();

		mobileArticlesAmp.map(
			(ampArticle) =>
				(task = task.update(
					'articles',
					{ id: ampArticle.c_id },
					{
						$set: {
							bodyMobileAmp: ampArticle.c_mobile_body,
							headerMobileImagePath:
								ampArticle.c_header_mobile_image_name,
							headerMobileImageWidth:
								ampArticle.c_header_mobile_image_width,
							headerMobileImageHeight:
								ampArticle.c_header_mobile_image_height,
						},
					},
				)),
		);

		task.run();
	} catch (ex) {
		console.log('Error:', ex);
	}
};

module.exports.mapContentToArticle = mapContentToArticle;
module.exports.mapMobileAmpToArticle = mapMobileAmpToArticle;
module.exports.mapMobileToArticle = mapMobileToArticle;
