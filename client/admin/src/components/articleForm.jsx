import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import React from 'react';
import { uploadImage } from '../services/imageService';
import { getArticleById, updateArticleById } from '../services/articleService';
import { getCategories } from '../services/categoryService';
import Form from './common/form';

class ArticleForm extends Form {
	state = {
		data: {
			id: '',
			title: '',
			urlTitle: '',
			categoryId: '',
			body: '',
			headerImagePath: '',
			headerImageAltDesc: '',
			headerImageWidth: '',
			headerImageHeight: '',
			headerThumbnailImageWidth: '',
			headerThumbnailImageHeight: '',
			categoryDisplay: true,
			createdOn: '',
			summary: '',
			titleTag: '',
			nonAmpUrl: '',
			ampUrl: '',
			uploadedFilePath: '',
			relatedArticles: '',
		},
		categories: [],
		errors: [],
	};

	schema = {
		title: Joi.string()
			.required()
			.label('Title'),
		urlTitle: Joi.string()
			.required()
			.label('URL Title'),
		categoryId: Joi.string().label('Category'),
	};

	populateArticle = async () => {
		try {
			const articleId = this.props.match.params.id;
			if (articleId === 'new') return;

			const { data: article } = await getArticleById(articleId);
			this.setState({ data: this.mapViewModel(article) });
		} catch (ex) {
			console.log('Error: ', ex);
		}
	};

	populateCategories = async () => {
		try {
			const categories = await getCategories();

			this.setState({ categories });
		} catch (ex) {
			console.log('Error: ', ex);
		}
	};

	async componentDidMount() {
		await this.populateArticle();
		await this.populateCategories();
	}

	mapViewModel = (article) => {
		return {
			id: article.id,
			title: article.title,
			urlTitle: article.urlTitle,
			categoryId: article.category._id,
			body: article.body,
			headerImagePath: article.headerImagePath,
			headerImageAltDesc: article.headerImageAltDesc,
			headerImageWidth: article.headerImageWidth,
			headerImageHeight: article.headerImageHeight,
			headerThumbnailImageWidth: article.headerThumbnailImageWidth,
			headerThumbnailImageHeight: article.headerThumbnailImageHeight,
			categoryDisplay: article.categoryDisplay,
			createdOn: article.createdOn,
			summary: article.summary,
			titleTag: article.titleTag,
			nonAmpUrl: article.nonAmpUrl,
			ampUrl: article.ampUrl,
			relatedArticles: article.relatedArticles,
		};
	};

	getFormData = (object) => {
		return Object.keys(object).reduce((formData, key) => {
			formData.append(key, object[key]);
			return formData;
		}, new FormData());
	};

	doSubmit = async () => {
		try {
			delete this.state.data.image;
			const result = await updateArticleById(
				this.props.match.params.id,
				this.state.data,
			);
			if (result.status === 200)
				return toast.success('Data updated successfully');
		} catch (ex) {
			toast.error(`Error: ${ex}`);
		}
	};

	isFileTypeImage = (file) => {
		if (!file) return;
		const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
		return acceptedImageTypes.includes(file.type);
	};

	handleFileSelect = ({ target: input }) => {
		const file = input.files[0];

		if (this.isFileTypeImage(file)) {
			const data = { ...this.state.data };
			data.image = file;
			this.setState({ data });
		}
	};

	imageUpload = (imgFile) => {
		const { url: categoryName } = this.state.categories.filter(
			(c) => c._id === this.state.data.categoryId,
		)[0];
		const fd = this.getFormData({
			urlTitle: this.state.data.urlTitle,
			categoryName,
			image: imgFile,
		});
		return uploadImage(fd);
	};

	handleUploadImageFromTextEditor = async (
		blobInfo,
		success,
		failure,
		progress,
	) => {
		try {
			const result = await this.imageUpload(blobInfo.blob());
			if (result.status === 200) {
				await success(result.data);
				return toast.success('Image uploaded successfully');
			}
		} catch (ex) {
			failure(ex);
			toast.error(`Error: ${ex}`);
		}
	};

	handleUploadHeaderImage = async () => {
		try {
			const result = await this.imageUpload(this.state.data.image);
			if (result.status === 200) {
				const { data } = { ...this.state };
				data.headerImagePath = result.data;
				this.setState({ data });
				return toast.success('Image uploaded successfully');
			}
		} catch (ex) {
			toast.error(`Error: ${ex}`);
		}
	};

	handleEditorChange = (value, editor) => {
		const data = { ...this.state.data };
		data.body = value;
		this.setState({ data });
	};

	render() {
		const { data } = this.state;
		const name = 'headerImagePath';
		const value = data[name];
		return (
			<React.Fragment>
				<div className="form-group">Article Form</div>
				{this.renderInput('title', 'Title')}
				{this.renderTextEditor('body', 'Article Body')}
				{this.renderInput('urlTitle', 'URL Title')}
				{this.renderDropdownList(
					'categoryId',
					'Category',
					this.state.categories,
				)}
				<div className="header-image-section mb-3">
					<label>Header Image Section</label>
					<img
						className="header-image mb-3"
						id=""
						src={value}
						alt=""
					/>
					{this.renderInput('headerImagePath', 'Header Image Path')}
					<input
						type="file"
						className=""
						onChange={this.handleFileSelect}
					/>
					{this.renderButton(
						'Upload Image',
						this.handleUploadHeaderImage,
					)}
				</div>
				{this.renderInput('headerImageAltDesc', 'headerImageAltDesc')}
				{this.renderInput('headerImageWidth', 'headerImageWidth')}
				{this.renderInput('headerImageHeight', 'headerImageHeight')}
				{this.renderInput(
					'headerThumbnailImageWidth',
					'headerThumbnailImageWidth',
				)}
				{this.renderInput(
					'headerThumbnailImageHeight',
					'headerThumbnailImageHeight',
				)}
				{this.renderDropdownList(
					'categoryDisplay',
					'Display Category',
					[
						{ _id: 'true', name: 'true' },
						{ _id: 'false', name: 'false' },
					],
				)}
				{this.renderInput('createdOn', 'createdOn')}
				{this.renderInput('summary', 'summary')}
				{this.renderInput('titleTag', 'titleTag')}
				{this.renderInput('nonAmpUrl', 'nonAmpUrl')}
				{this.renderInput('ampUrl', 'ampUrl')}
				{this.renderInput('relatedArticles', 'relatedArticles')}

				{this.renderButton('Submit', this.handleSubmit)}
			</React.Fragment>
		);
	}
}

export default ArticleForm;
