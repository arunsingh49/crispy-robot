import React from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

class TextEditor extends React.Component {
	modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, 7, false] }],
			[
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'code-block',
			],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' },
			],
			['link', 'image'],
			['clean'],
		],
	};
	formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'video',
	];
	theme = ['snow'];
	render() {
		const { label, value, onChange } = this.props;
		return (
			<div className="mb-3">
				<label className="form-input-label">{label}</label>
				<ReactQuill
					value={value}
					onChange={onChange}
					modules={this.modules}
					formats={this.formats}
					theme={this.theme}
				/>
			</div>
		);
	}
}

export default TextEditor;
