const mongoose = require('mongoose');
const request = require('supertest');
const { User } = require('../../model/user');
const { Article } = require('../../model/article');
const { Category } = require('../../model/category');
let server;

describe('/api/articles', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
		await Article.deleteMany({});
		await Category.deleteMany({});
	});
	describe('GET', () => {
		it('should return all the available articles in DB', async () => {
			const articles = [
				{ title: 'a1', urlTitle: 'b1', category: { url: 'cat1' } },
				{ title: 'a2', urlTitle: 'b2', category: { url: 'cat2' } },
			];

			await Article.collection.insertMany(articles);

			const res = await request(server).get('/api/articles');

			expect(res.status).toBe(200);

			expect(res.body.some((a) => a.title === 'a1')).toBeTruthy();
			expect(res.body.some((a) => a.title === 'a2')).toBeTruthy();
			expect(res.body.some((a) => a.urlTitle === 'b1')).toBeTruthy();
			expect(res.body.some((a) => a.urlTitle === 'b2')).toBeTruthy();
		});
	});
	describe('POST', () => {
		let article;
		let category;
		let token;
		const postReq = () => {
			return request(server)
				.post('/api/articles')
				.set('x-auth-token', token)
				.send(article);
		};
		beforeEach(async () => {
			token = new User().generateAuthToken();

			category = new Category({
				name: 'a',
				url: 'b',
			});

			await category.save();

			article = {
				title: 'a1',
				urlTitle: 'b1',
				categoryId: category._id,
			};
		});
		it('should return 400 if title for the available article is not supplied', async () => {
			article.title = '';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if urlTitle for the article is not supplied', async () => {
			article.urlTitle = '';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if the category with the given categoryId is not found', async () => {
			article.categoryId = mongoose.Types.ObjectId();

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should save article to DB if a valid request is passed', async () => {
			await postReq();

			const articleFromDB = await Article.findOne({ urlTitle: 'b1' });

			expect(articleFromDB).toHaveProperty('title', 'a1');
			expect(articleFromDB).toHaveProperty('urlTitle', 'b1');
		});
		it('should return article as a response if a valid request is passed', async () => {
			const res = await postReq();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('title', 'a1');
			expect(res.body).toHaveProperty('urlTitle', 'b1');
		});
	});
	describe('PUT /:id', () => {
		let id;
		let category;
		let article;
		let token;
		let newCategory;
		let articleToBeUpdated;
		const putReq = () => {
			return request(server)
				.put('/api/articles/' + article._id)
				.set('x-auth-token', token)
				.send(articleToBeUpdated);
		};
		const itVerifyStringMaxLength = (field, maxLen) => {
			it(`Should return 400 if ${field} exceeds ${maxLen} chars`, async () => {
				articleToBeUpdated[field] = new Array(maxLen + 2).join('a');

				const res = await putReq();

				expect(res.status).toBe(400);
			});
		};
		const itVerifyIfStringEmpty = (field) => {
			it(`Should return 400 if ${field} is not provided`, async () => {
				articleToBeUpdated[field] = '';

				const res = await putReq();

				expect(res.status).toBe(400);
			});
		};
		beforeEach(async () => {
			token = new User().generateAuthToken();

			category = new Category({
				name: 'a',
				url: 'a',
			});

			await category.save();

			article = new Article({
				id: 1,
				title: 'a',
				urlTitle: 'a',
				category: {
					_id: category._id,
					name: category.name,
					url: category.url,
				},
				body: 'a',
				template: 'a',
				headerImagePath: 'a',
				headerImageAltDesc: 'a',
				headerImageWidth: 'a',
				headerImageHeight: 'a',
				headerThumbnailImagePath: 'a',
				headerThumbnailImageAltDesc: 'a',
				headerThumbnailImageWidth: 'a',
				headerThumbnailImageHeight: 'a',
				// createdOn: 'a' , // default is Date.now
				summary: 'a',
				titleTag: 'a',
				metaDesc: 'a',
				nonAmpUrl: 'a',
				ampUrl: 'a',
				categoryDisplay: true,
				modifiedOn: new Date(),
				relatedArticles: 'a',
			});
			await article.save();

			newCategory = new Category({
				name: 'b',
				url: 'b',
			});

			await newCategory.save();

			articleToBeUpdated = {
				id: 1,
				title: 'b',
				urlTitle: 'b',
				categoryId: newCategory._id,
				body: 'b',
				template: 'b',
				headerImagePath: 'b',
				headerImageAltDesc: 'b',
				headerImageWidth: 'b',
				headerImageHeight: 'b',
				headerThumbnailImagePath: 'b',
				headerThumbnailImageAltDesc: 'b',
				headerThumbnailImageWidth: 'b',
				headerThumbnailImageHeight: 'b',
				// createdOn: 'b' , // default is Date.now
				summary: 'b',
				titleTag: 'b',
				metaDesc: 'b',
				nonAmpUrl: 'b',
				ampUrl: 'b',
				categoryDisplay: true,
				modifiedOn: new Date(),
				relatedArticles: 'b',
			};
		});

		// String Max Length check - return 400 if excceds
		itVerifyStringMaxLength('title', 150);
		itVerifyStringMaxLength('urlTitle', 150);
		itVerifyStringMaxLength('template', 100);
		itVerifyStringMaxLength('headerImagePath', 500);
		itVerifyStringMaxLength('headerImageAltDesc', 500);
		itVerifyStringMaxLength('headerImageWidth', 100);
		itVerifyStringMaxLength('headerImageHeight', 100);
		itVerifyStringMaxLength('headerThumbnailImagePath', 500);
		itVerifyStringMaxLength('headerThumbnailImageAltDesc', 500);
		itVerifyStringMaxLength('headerThumbnailImageWidth', 100);
		itVerifyStringMaxLength('headerThumbnailImageHeight', 100);
		itVerifyStringMaxLength('summary', 2000);
		itVerifyStringMaxLength('titleTag', 1000);
		itVerifyStringMaxLength('metaDesc', 1000);
		itVerifyStringMaxLength('nonAmpUrl', 500);
		itVerifyStringMaxLength('ampUrl', 500);
		itVerifyStringMaxLength('relatedArticles', 500);

		// String Required field check - return 400 if field not provided.
		itVerifyIfStringEmpty('title');
		itVerifyIfStringEmpty('urlTitle');

		it('should save article to DB if a valid request is passed', async () => {
			const res = await putReq();

			const articleFromDB = await Article.findById(article._id);

			expect(articleFromDB).toHaveProperty('id', 1);
			expect(articleFromDB).toHaveProperty('title', 'b');
			expect(articleFromDB).toHaveProperty('urlTitle', 'b');
			// expect(articleFromDB).toHaveProperty('categoryId', newCategory._id
			expect(articleFromDB).toHaveProperty('body', 'b');
			expect(articleFromDB).toHaveProperty('template', 'b');
			expect(articleFromDB).toHaveProperty('headerImagePath', 'b');
			expect(articleFromDB).toHaveProperty('headerImageAltDesc', 'b');
			expect(articleFromDB).toHaveProperty('headerImageWidth', 'b');
			expect(articleFromDB).toHaveProperty('headerImageHeight', 'b');
			expect(articleFromDB).toHaveProperty(
				'headerThumbnailImagePath',
				'b',
			);
			expect(articleFromDB).toHaveProperty(
				'headerThumbnailImageAltDesc',
				'b',
			);
			expect(articleFromDB).toHaveProperty(
				'headerThumbnailImageWidth',
				'b',
			);
			expect(articleFromDB).toHaveProperty(
				'headerThumbnailImageHeight',
				'b',
			);
			expect(articleFromDB).toHaveProperty('createdOn');
			expect(articleFromDB).toHaveProperty('summary', 'b');
			expect(articleFromDB).toHaveProperty('titleTag', 'b');
			expect(articleFromDB).toHaveProperty('metaDesc', 'b');
			expect(articleFromDB).toHaveProperty('nonAmpUrl', 'b');
			expect(articleFromDB).toHaveProperty('ampUrl', 'b');
			expect(articleFromDB).toHaveProperty('categoryDisplay', true);
			expect(articleFromDB).toHaveProperty('modifiedOn');
			expect(articleFromDB).toHaveProperty('relatedArticles', 'b');
		});
		it('should return 200 response if valid request is passed', async () => {
			const res = await putReq();

			expect(res.status).toBe(200);
		});
	});
	describe('DELETE /:id', () => {
		let id;
		let token;
		let article;

		const delReq = () => {
			return request(server)
				.delete('/api/articles/' + id)
				.set('x-auth-token', token);
		};
		beforeEach(async () => {
			token = new User().generateAuthToken();

			article = new Article({
				title: 'a',
				urlTitle: 'a',
			});

			await article.save();

			id = article._id;
		});
		it('Sould return 401 if no authentication is supplied', async () => {
			token = '';

			const res = await delReq();

			expect(res.status).toBe(401);
		});
		it('Sould return 204 when article id is not found in DB', async () => {
			id = mongoose.Types.ObjectId();

			const res = await delReq();

			expect(res.status).toBe(204);
		});
		it('Sould return 400 when article id is not valid', async () => {
			id = '123';

			const res = await delReq();

			expect(res.status).toBe(400);
		});
		it('Should delete article and return 200 response when a valid article id is passed', async () => {
			const res = await delReq();

			expect(res.status).toBe(200);
		});
		it('Should delete article from db when a valid article id is passed', async () => {
			const res = await delReq();

			const articleFromDB = await Article.findOne({});

			expect(articleFromDB).toBeNull();
		});
	});
	describe('GET /:id', () => {
		let id;
		let article;

		const getReq = () => {
			return request(server).get('/api/articles/' + id);
		};
		beforeEach(async () => {
			article = new Article({
				title: 'a',
				urlTitle: 'a',
			});

			await article.save();

			id = article._id;
		});
		it('Should return 404 (not found) when article id does not exist in DB', async () => {
			id = mongoose.Types.ObjectId();

			const res = await getReq();

			expect(res.status).toBe(404);
		});
		it('Should return 400 when an invalid article id is passed.', async () => {
			id = '123';

			const res = await getReq();

			expect(res.status).toBe(404);
		});
		it('Should return an article when a valid article id is passed', async () => {
			const res = await getReq();

			expect(res.body).toHaveProperty('_id');
			expect(res.body).toHaveProperty('title', 'a');
			expect(res.body).toHaveProperty('urlTitle', 'a');
		});
	});
});
