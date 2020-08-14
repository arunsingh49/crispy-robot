import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TinymceEditor = ({ value, onImageUpload, onEditorChange }) => {
	return (
		<Editor
			value={value}
			onEditorChange={onEditorChange}
			apiKey="ptosksp5lyxhnirmrne9e8tfajr4nyc1936ecbzis5fupen4"
			init={{
				images_upload_url: 'http://localhost:9000/api/images',
				images_upload_handler: onImageUpload,
				height: 500,
				menubar: false,
				onEditorChange: onEditorChange,
				outputformat: 'text',
				plugins: [
					'advlist autolink lists link image charmap print preview hr anchor pagebreak',
					'searchreplace wordcount visualblocks visualchars code fullscreen',
					'insertdatetime media nonbreaking save table directionality',
					'emoticons template paste textpattern imagetools codesample toc help',
				],
				toolbar1:
					'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
				toolbar2:
					'print preview media | forecolor backcolor emoticons | codesample help',
				image_advtab: true,
				templates: [
					{ title: 'Test template 1', content: 'Test 1' },
					{ title: 'Test template 2', content: 'Test 2' },
				],
				content_css: [
					'//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
					'//www.tinymce.com/css/codepen.min.css',
				],
				save_onsavecallback: function() {
					console.log('Saved');
				},
			}}
		/>
	);
};

export default TinymceEditor;
