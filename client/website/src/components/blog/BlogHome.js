import React from 'react';
import { getArticles } from '../../services/articleService';
import MobileSideMenu from '../common/MobileSideMenu';
import HomeCarousel from '../common/HomeCarousel';
import ListingColumn from '../common/ListingColumn';
import Pagination from '../common/Pagination';
import Header from '../common/Header';
import Footer from '../common/Footer';

class BlogHome extends React.Component {
	constructor(props) {
		super(props);
		this.paginationRef = React.createRef();
	}
	state = {
		data: [],
		currentPage: 1,
		pageSize: 10,
		itemsCount: 0,
	};
	scrollToRef = () => {
		console.log('i am clicked');
		window.scrollTo(0, this.paginationRef.current.offsetTop);
	};
	populateArticles = async (articleId) => {
		const { data, count } = await getArticles(
			this.state.currentPage,
			this.state.pageSize,
			articleId,
		);
		this.setState({ data, itemsCount: count });
	};
	handlePageChange = async (page) => {
		const { data } = await getArticles(page, this.state.pageSize);
		this.setState({ data: data, currentPage: page });
		this.scrollToRef();
	};
	componentDidMount() {
		this.populateArticles();
	}

	render() {
		const { data, currentPage, pageSize, itemsCount } = this.state;
		const halfLength = Math.ceil(data.length / 2);
		const dataSet1 = data.slice(0, halfLength);
		const dataSet2 = data.slice(halfLength);
		return (
			<div>
				<MobileSideMenu />
				<div className="site-wrap">
					<Header />
					<HomeCarousel />
					<div id="blogProfile">
						<div className="col-lg-12 col-md-12">
							<div className="lsw-wrapper">
								<div className="row">
									<div className="col-md-12 col-sm-12">
										<div className="blogArchive-area">
											<div className="row">
												<div className="col-md-6 col-sm-6 col-xs-12">
													<ListingColumn
														data={dataSet1}
													/>
												</div>
												<div className="col-md-6 col-sm-6 col-xs-12">
													<ListingColumn
														data={dataSet2}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Pagination
									onPageChange={this.handlePageChange}
									currentPage={currentPage}
									pageSize={pageSize}
									itemsCount={itemsCount}
									ref={this.paginationRef}
								/>
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</div>
		);
	}
}

export default BlogHome;
