import React from 'react';

class DropdownList extends React.Component {
	render() {
		const { name, label, options, value, onChange, error } = this.props;

		return (
			<div className="mb-3">
				<label className="mb-0">{label}</label>
				<div className="input-group">
					<select
						id={name}
						name={name}
						value={value}
						onChange={onChange}
						className="custom-select"
					>
						<option disabled hidden></option>
						{options.map((option) => (
							<option key={option._id} value={option._id}>
								{option.name}
							</option>
						))}
					</select>
				</div>
				{error && <div className="alert alert-danger">{error}</div>}
			</div>
		);
	}
}

export default DropdownList;
