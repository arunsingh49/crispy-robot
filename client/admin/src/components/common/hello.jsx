import React from 'react';

const Hello = (props) => {
	if (props.name) {
		return <div>Hello, {props.name}!</div>;
	} else {
		return <span>Hello, stranger</span>;
	}
};

export default Hello;
