import React from 'react';

const SearchBox = ({ onChange, name, value }) => {
	return (
		<input
			name={name}
			onChange={(e) => onChange(e.currentTarget.value)}
			className="form-control searchBox"
			placeholder="Search by title..."
			value={value}
		/>
	);
};

export default SearchBox;
