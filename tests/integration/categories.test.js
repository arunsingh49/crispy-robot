const mongoose = require('mongoose');
const request = require('supertest');
const _ = require('lodash');
const { Category } = require('../../model/category');
const { User } = require('../../model/user');
let server;

describe('/api/categories', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
		await Category.deleteMany({});
	});
	describe('GET', () => {
		it('should return all categories', async () => {
			const categories = await Category.insertMany([
				{
					name: 'cat1',
					url: 'url1',
					title: 'title1',
					description: 'desc1',
					imgUrl: 'imgUrl1',
				},
				{
					name: 'cat2',
					url: 'url2',
					title: 'title2',
					description: 'desc2',
					imgUrl: 'imgUrl2',
				},
			]);

			const res = await request(server).get('/api/categories');

			expect(res.status).toBe(200);
			expect(res.body.length).toEqual(2);
			expect(res.body.some((c) => c.name === 'cat1')).toBeTruthy();
			expect(res.body.some((c) => c.name === 'cat2')).toBeTruthy();
			expect(res.body.some((c) => c.url === 'url1')).toBeTruthy();
			expect(res.body.some((c) => c.url === 'url2')).toBeTruthy();
		});
	});
	describe('GET by id', () => {
		it('Should return a single category data when valid id is passed.', async () => {
			const category = new Category({
				name: 'a',
				url: 'b',
			});

			await category.save();

			const res = await request(server).get(
				'/api/categories/' + category._id,
			);
			expect(res.status).toBe(200);
			expect(res.body.name).toMatch('a');
			expect(res.body.url).toMatch('b');
		});
		it('Should return 404 when an invalid id is passed', async () => {
			const id = 1;
			const res = await request(server).get('/api/categories/' + id);

			expect(res.status).toBe(404);
		});
		it('Should return 404 when category with the given id does not exist', async () => {
			const id = mongoose.Types.ObjectId();
			const res = await request(server).get('/api/categories/' + id);

			expect(res.status).toBe(404);
		});
	});
	describe('DELETE by id', () => {
		let category;
		beforeEach(() => {
			category = new Category({
				name: 'a',
				url: 'b',
			});
		});
		const delReq = () => {
			return request(server).delete('/api/categories/' + category._id);
		};
		it('Should delete and return a category as response when valid id is passed.', async () => {
			await category.save();

			const res = await delReq();

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', 'a');
			expect(res.body).toHaveProperty('url', 'b');
		});
		it('Should delete the category from database when valid id is passed.', async () => {
			await category.save();

			await delReq();

			const categoryFromDB = await Category.findById(category._id);

			expect(categoryFromDB).toBeNull();
		});
		it('Should return 404 when an invalid id is passed', async () => {
			const id = 1;

			const res = await request(server).delete('/api/categories/' + id);

			expect(res.status).toBe(404);
		});
	});
	describe('POST', () => {
		let token;
		let category;

		const postReq = () => {
			return request(server)
				.post('/api/categories')
				.set('x-auth-token', token)
				.send(category);
		};

		beforeEach(() => {
			category = {
				name: 'a',
				url: 'b',
				title: 'c',
				description: 'd',
				imgUrl: 'e',
			};
			token = new User().generateAuthToken();
		});
		it('should return 401 user is not logged in', async () => {
			token = '';

			const res = await postReq();

			expect(res.status).toBe(401);
		});
		it('should return 400 if invalid token is provided', async () => {
			token = 'abc';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 404 if the name is not provided', async () => {
			category.name = '';

			const res = await postReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the url is not provided', async () => {
			category.url = '';

			const res = await postReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the name is greater than 150 chars', async () => {
			category.name = new Array(152).join('a');

			const res = await postReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the url is greater than 150 chars', async () => {
			category.url = new Array(152).join('a');

			const res = await postReq();

			expect(res.status).toBe(404);
		});
		it('should save to DB if category is valid', async () => {
			await postReq();

			const categoryFromDB = await Category.findOne({ url: 'b' });

			expect(categoryFromDB).toHaveProperty('_id');
			expect(categoryFromDB).toHaveProperty('name', 'a');
			expect(categoryFromDB).toHaveProperty('url', 'b');
			expect(categoryFromDB).toHaveProperty('title', 'c');
			expect(categoryFromDB).toHaveProperty('description', 'd');
			expect(categoryFromDB).toHaveProperty('imgUrl', 'e');
		});
		it('should return category if valid category object is passed', async () => {
			const res = await postReq();

			expect(res.body).toMatchObject(category);
		});
	});
	describe('PUT/:id', () => {
		let token;
		let id;
		let newCategory;

		const putReq = () => {
			return request(server)
				.put('/api/categories/' + id)
				.set('x-auth-token', token)
				.send(newCategory);
		};
		beforeEach(async () => {
			token = new User().generateAuthToken();
			const category = new Category({
				name: 'a',
				url: 'b',
				title: 'c',
				description: 'd',
				imgUrl: 'e',
			});
			await category.save();
			id = category._id;

			newCategory = {
				name: 'newName',
				url: 'newUrl',
				title: 'newTitle',
				description: 'newDescription',
				imgUrl: 'newImgUrl',
			};
		});
		it('should return 401 user is not logged in', async () => {
			token = '';

			const res = await putReq();

			expect(res.status).toBe(401);
		});
		it('should return 400 if invalid token is provided', async () => {
			token = 'abc';

			const res = await putReq();

			expect(res.status).toBe(400);
		});
		it('should return 404 if the name is not provided', async () => {
			newCategory.name = '';

			const res = await putReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the url is not provided', async () => {
			newCategory.url = '';

			const res = await putReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the name is greater than 150 chars', async () => {
			newCategory.name = new Array(152).join('a');

			const res = await putReq();

			expect(res.status).toBe(404);
		});
		it('should return 404 if the url is greater than 150 chars', async () => {
			newCategory.url = new Array(152).join('a');

			const res = await putReq();

			expect(res.status).toBe(404);
		});
		it('should save new records in DB if category id and body is valid', async () => {
			await putReq();

			const categoryFromDB = await Category.findById(id);

			newCategory._id = id;

			expect(categoryFromDB).toHaveProperty('_id');
			expect(categoryFromDB).toHaveProperty('name', 'newName');
			expect(categoryFromDB).toHaveProperty('url', 'newUrl');
			expect(categoryFromDB).toHaveProperty('title', 'newTitle');
			expect(categoryFromDB).toHaveProperty(
				'description',
				'newDescription',
			);
			expect(categoryFromDB).toHaveProperty('imgUrl', 'newImgUrl');
		});
		it('should return category if valid category object is passed', async () => {
			const res = await putReq();

			newCategory._id = id.toHexString();

			expect(res.body).toMatchObject(newCategory);
		});
	});
});
