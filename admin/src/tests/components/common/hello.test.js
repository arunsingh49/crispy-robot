import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Hello from '../../../components/common/hello';

let container = null;

beforeEach(() => {
	// setup a DOM element as render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on existing
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it('renders with or without name', () => {
	act(() => {
		render(<Hello />, container);
	});
	expect(container.textContent).toBe('Hello, stranger');

	act(() => {
		render(<Hello name="Jenny" />, container);
	});
	expect(container.textContent).toBe('Hello, Jenny!');

	act(() => {
		render(<Hello name="Margaret" />, container);
	});
	expect(container.textContent).toBe('Hello, Margaret!');
});
