import React from 'react';

const Input = ({ name, label, value, onChange, error }) => {
	return (
		<div className="mb-3">
			<label className="form-input-label">{label}</label>
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
