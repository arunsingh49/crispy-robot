import Joi from 'joi-browser';
import React, { Component } from 'react';
import DropdownList from './dropdownList';
import TextEditor from './tinymceEditor';
import Input from './input';

class Form extends Component {
	state = {
		data: {},
		errors: [],
	};

	validateProperty = ({ name, value }) => {
		if (!name || !this.schema[name]) return;

		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema, {
			allowUnknown: true,
		});

		return error ? error.details[0].message : null;
	};

	validate = () => {
		const { error } = Joi.validate(this.state.data, this.schema, {
			allowUnknown: true,
		});

		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);

		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();

		this.setState({ errors: errors || {} });

		if (errors) return;

		this.doSubmit();
	};

	renderDropdownList = (name, label, options) => {
		const { data, errors } = this.state;
		return (
			<DropdownList
				name={name}
				label={label}
				options={options}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	};
	renderTextEditor = (name, label) => {
		const { data } = this.state;
		return (
			<TextEditor
				value={data[name]}
				label={label}
				onImageUpload={this.handleUploadImageFromTextEditor}
				onEditorChange={this.handleEditorChange}
			/>
		);
	};
	renderInput = (name, label, type = 'text') => {
		const { data, errors } = this.state;
		return (
			<Input
				label={label}
				type={type}
				name={name}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	};

	renderButton = (label, onClick) => {
		return (
			<button
				disabled={this.validate()}
				onClick={onClick}
				className="btn btn-primary"
			>
				{label}
			</button>
		);
	};
}

export default Form;
