import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { registerUser } from '../services/userService';

class RegisterForm extends Form {
	state = {
		data: { email: '', password: '', name: '' },
		errors: {},
	};
	schema = {
		email: Joi.string()
			.required()
			.email()
			.label('Email'),
		password: Joi.string()
			.required()
			.min(5)
			.label('Password'),
		name: Joi.string()
			.required()
			.label('Name'),
	};
	doSubmit = async () => {
		try {
			const response = await registerUser(this.state.data);
			auth.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div className="container">
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('email', 'Email')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
