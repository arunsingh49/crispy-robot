const mongoose = require('mongoose');
const collectionName = 'lswContents';

const wellnezGCPLive = mongoose.createConnection(
	'mongodb://localhost/wellnezGCPLive',
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
);

const lswContentSchema = new mongoose.Schema(
	{
		c_id: { type: Number },
		c_title: { type: String },
		c_url_title: { type: String },
		c_category: { type: String },
		c_body: { type: String },
		c_template: { type: String },
		c_header_image_name: { type: String },
		c_header_image_alt_desc: { type: String },
		c_header_image_path: { type: String },
		c_header_image_width: { type: String },
		c_header_image_height: { type: String },
		c_header_thumbnail_image_name: { type: String },
		c_header_thumbnail_image_alt_desc: { type: String },
		c_header_thumbnail_image_width: { type: String },
		c_header_thumbnail_image_height: { type: String },
		c_created_on: { type: String },
		c_summary: { type: String },
		c_title_tag: { type: String },
		c_meta_desc: { type: String },
		c_non_amp_url: { type: String },
		c_amp_url: { type: String },
		c_category_url: { type: String },
		c_category_display: { type: String },
		c_modified_on: { type: String },
		c_related_articles: { type: String },
	},
	{ collection: collectionName },
);

const articleAggregateQuery = (articleIDs) => {
	return [
		{ $match: { c_id: { $in: articleIDs } } },
		{
			$project: {
				_id: 0,
				id: '$c_id',
				title: '$c_title',
				urlTitle: '$c_url_title',
				category: '$c_category',
				body: '$c_body',
				headerImagePath: '$c_header_image_name',
				headerImageAltDesc: '$c_header_image_alt_desc',
				headerImageWidth: '$c_header_image_width',
				headerImageHeight: '$c_header_image_height',
				headerThumbnailImagePath: '$c_header_thumbnail_image_name',
				headerThumbnailImageAltDesc:
					'$c_header_thumbnail_image_alt_desc',
				headerThumbnailImageWidth: '$c_header_thumbnail_image_width',
				headerThumbnailImageHeight: '$c_header_thumbnail_image_height',
				createdOn: '$c_created_on',
				summary: '$c_summary',
				titleTag: '$c_title_tag',
				metaDescTag: '$c_meta_desc',
				nonAmpUrl: '$c_non_amp_url',
				ampUrl: '$c_amp_url',
				modifiedOn: '$c_modified_on',
				relatedArticles: '$c_related_articles',
			},
		},
	];
};

module.exports.lswContent = wellnezGCPLive.model(
	collectionName,
	lswContentSchema,
);

module.exports.articleAggregateQuery = articleAggregateQuery;
