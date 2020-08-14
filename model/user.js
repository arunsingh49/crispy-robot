const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const config = require('config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 255,
	},
	email: {
		type: String,
		required: true,
		maxlength: 512,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 1025,
	},
	isAdmin: { type: Boolean, default: false },
});

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string()
			.max(255)
			.required(),
		email: Joi.string()
			.max(512)
			.email()
			.required(),
		password: Joi.string()
			.min(6)
			.max(1024)
			.required(),
	});

	return schema.validate(user);
}

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
			isAdmin: this.isAdmin,
		},
		config.get('jwtPrivateKey'),
	);
	return token;
};

const User = mongoose.model('User', userSchema);

exports.User = User;
exports.validateUser = validateUser;
