const request = require('supertest');
const { User } = require('../../model/user');

let server;
describe('/api/users', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		await server.close();
		await User.deleteMany({});
	});
	describe('GET', () => {
		it('should return the user details when valid token is provided', async () => {
			const user = new User({
				name: 'a',
				email: 'abc@gmail.com',
				password: 'abcdefg',
			});

			await user.save();

			const token = user.generateAuthToken();

			const res = await request(server)
				.get('/api/users/me')
				.set('x-auth-token', token);

			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('name', 'a');
			expect(res.body).toHaveProperty('email', 'abc@gmail.com');
			expect(res.body).not.toHaveProperty('password');
		});
	});
	describe('POST', () => {
		let token;
		let user;
		const postReq = () => {
			return request(server)
				.post('/api/users')
				.send(user);
		};

		beforeEach(() => {
			user = {
				name: 'a',
				email: 'abc@gmail.com',
				password: 'abcdefg',
			};
		});
		it('should return 400 if name is not provided', async () => {
			user.name = '';
			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if email is not provided', async () => {
			user.email = '';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if password is not provided', async () => {
			user.password = '';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if user is more than 255 chars', async () => {
			user.name = new Array(257).join('a');

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if email is more than 512 chars', async () => {
			user.email = new Array(514).join('a');

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if password is less than 6 chars', async () => {
			user.password = 'abcde';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if password is more than 1024 chars', async () => {
			user.password = new Array(1026).join('a');

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if valid email is not provided', async () => {
			user.email = 'a';

			const res = await postReq();

			expect(res.status).toBe(400);
		});
		it('should return 400 if user already in DB', async () => {
			newUser = new User(user);
			await newUser.save();

			const res = await postReq();

			expect(res.status).toBe(400);
			expect(res.error.text).toMatch(/already exists/);
		});
		it('should save records in DB if the user details are valid', async () => {
			await postReq();

			const userFromDB = await User.findOne({ email: 'abc@gmail.com' });

			expect(userFromDB).toHaveProperty('_id');
			expect(userFromDB).toHaveProperty('name', 'a');
			expect(userFromDB).toHaveProperty('email', 'abc@gmail.com');
			expect(userFromDB).toHaveProperty('password');
			expect(userFromDB).toHaveProperty('isAdmin');
		});
		it('should return user object with response if the user details are valid', async () => {
			const res = await postReq();

			delete user.password;

			expect(res.body).toMatchObject(user);
			expect(res.header).toHaveProperty('x-auth-token');
		});
	});
});
