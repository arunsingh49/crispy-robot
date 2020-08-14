import '../css/blogListing.scss';
import React, { Component } from 'react';

import { getArticles } from '../../services/articleService';
import { getRelatedArticlesById } from '../../services/relatedArticleService';
import RelatedArticles from '../common/RelatedArticles';
import MobileSideMenu from '../common/MobileSideMenu';
import BlogListingBody from '../common/BlogListingBody';
import Footer from '../common/Footer';
import Header from '../common/Header';

class BlogListing extends Component {
	state = {
		data: [],
		relatedArticles: [],
		currentPage: 1,
		pageSize: 9,
		itemsCount: 0,
	};
	breadCrumbsData = () => {
		return [
			{ id: 1, name: 'Home', url: '/', isActive: false },
			{
				id: 2,
				name: 'Running',
				url: 'running',
				isActive: true,
			},
		];
	};
	getArticleId = (str) => {
		return str.substring(str.lastIndexOf('/')).replace('/', '');
	};
	populateRelatedArticles = async (articleId) => {
		const { data: relatedArticles } = await getRelatedArticlesById(
			articleId,
		);
		this.setState({ relatedArticles });
	};

	populateArticles = async (articleId) => {
		const { data, count } = await getArticles(
			this.state.currentPage,
			this.state.pageSize,
			articleId,
		);
		this.setState({ data, itemsCount: count });
	};

	populateListingPage = (url) => {
		const id = this.getArticleId(url);
		this.populateArticles(id);
		this.populateRelatedArticles(id);
	};

	handleHeaderClick = ({ currentTarget }) => {
		this.populateListingPage(currentTarget.href);
	};

	handlePageChange = async (page) => {
		const id = this.getArticleId(this.props.match.url);
		const { data } = await getArticles(page, this.state.pageSize, id);
		this.setState({ data: data, currentPage: page });
	};

	async componentDidMount() {
		this.populateListingPage(this.props.match.url);
	}
	render() {
		const {
			data,
			relatedArticles,
			currentPage,
			pageSize,
			itemsCount,
		} = this.state;
		return (
			<div>
				<MobileSideMenu />
				<div className="site-wrap">
					<Header onClick={this.handleHeaderClick} />
					<div id="blogProfile">
						<div className="col-lg-12 col-md-12">
							<div className="lsw-wrapper">
								<div className="row">
									<div className="col-md-12 col-sm-12">
										<div className="blogArchive-area">
											<div className="row">
												<BlogListingBody
													data={data}
													breadCrumbsData={this.breadCrumbsData()}
													onPageChange={
														this.handlePageChange
													}
													currentPage={currentPage}
													pageSize={pageSize}
													itemsCount={itemsCount}
												/>
												<RelatedArticles
													data={relatedArticles}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Footer />
				</div>
			</div>
		);
	}
}

export default BlogListing;
