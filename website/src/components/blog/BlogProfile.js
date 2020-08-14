import '../css/blogProfile.scss';
import React, { Component } from 'react';

import { getArticleById } from '../../services/articleService';
import { getRelatedArticlesById } from '../../services/relatedArticleService';
import MobileSideMenu from '../common/MobileSideMenu';
import RelatedArticles from '../common/RelatedArticles';
import Header from '../common/Header';
import Footer from '../common/Footer';
import BlogBody from '../common/BlogProfileBody';

class BlogProfile extends Component {
	state = {
		data: {
			id: '',
			title: '',
			urlTitle: '',
			body: '',
			template: '',
			headerImageName: '',
			headerImageAltDesc: '',
			headerImagePath: '',
			headerImageWidth: '',
			headerImageHeight: '',
			headerThumbnailImageName: '',
			headerThumbnailImageAltDesc: '',
			headerThumbnailImagePath: '',
			headerThumbnailImageWidth: '',
			headerThumbnailImageHeight: '',
			createdOn: '',
			summary: '',
			titleTag: '',
			metaDesc: '',
			nonAmpUrl: '',
			ampUrl: '',
			modifiedOn: '',
			relatedArticles: '',
			category: { name: '', url: '' },
			categoryDisplay: '',
		},
		relatedArticles: [],
	};
	populateArticleBody = async (articleId) => {
		const { data } = await getArticleById(articleId);
		this.setState({ data });
	};
	populateRelatedArticles = async (articleId) => {
		const { data: relatedArticles } = await getRelatedArticlesById(
			articleId.replace('/', ''),
		);
		this.setState({ relatedArticles });
	};
	async componentDidMount() {
		const { id } = this.props.match.params;
		this.populateArticleBody(id);
		this.populateRelatedArticles(id);
	}
	handleArticleChange = async ({ currentTarget }) => {
		const id = currentTarget.href
			.substring(currentTarget.href.lastIndexOf('/'))
			.replace('/', '');
		this.populateArticleBody(id);
		this.populateRelatedArticles(id);
	};
	render() {
		const { data, relatedArticles } = this.state;
		return (
			<div>
				<MobileSideMenu />
				<div className="site-wrap">
					<Header />
					<div id="lswMainBody">
						<div className="col-lg-12 col-md-12">
							<div className="lsw-wrapper">
								<div className="row">
									<div className="col-md-12 col-sm-12">
										<div className="blogArchive-area">
											<div className="row">
												<BlogBody data={data} />
												<RelatedArticles
													onArticleChange={
														this.handleArticleChange
													}
													data={relatedArticles}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}

export default BlogProfile;
