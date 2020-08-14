import React from 'react';
import { getArticles } from '../services/articleService';
import { getCategories } from '../services/dummyCategoryService';
import paginate from '../utils/paginate';
import ArticlesTable from './articlesTable';
import SearchBox from './common/searchBox';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';

class Articles extends React.Component {
	state = {
		articles: [],
		categories: [],
		pageSize: 9,
		currentPage: 1,
		searchQuery: '',
		selectedCategory: null,
	};
	async componentDidMount() {
		this.setState({
			articles: await getArticles(),
			categories: [
				{ _id: '', name: 'All Categories' },
				...getCategories(),
			],
		});
	}
	handleCategorySelect = (item) => {
		this.setState({ selectedCategory: item, currentPage: 1 });
	};
	handleSearch = (query) => {
		this.setState({
			searchQuery: query,
			selectedCategory: undefined,
			currentPage: 1,
		});
	};
	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};
	render() {
		const {
			articles: allArticles,
			categories,
			currentPage,
			pageSize,
			searchQuery,
			selectedCategory,
		} = this.state;

		let filtered =
			selectedCategory && selectedCategory._id
				? allArticles.filter(
						(a) => a.category._id === selectedCategory._id,
				  )
				: allArticles;

		// search by title
		filtered = searchQuery
			? allArticles.filter((a) =>
					a.title.match(new RegExp(searchQuery, 'gi')),
			  )
			: filtered;

		const totalCount = filtered.length;
		const articles = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-lg-2 col-md-2 col-sm-3 col-xs-0 d-none d-sm-block">
					<ListGroup
						items={categories}
						selectedItem={selectedCategory}
						onItemSelect={this.handleCategorySelect}
					/>
				</div>
				<div className="col">
					{this.props.user && (
						<button
							className="btn btn-primary mb-3"
							onClick={() => {
								this.props.history.push('/articles/new');
							}}
						>
							Add Article
						</button>
					)}
					<SearchBox
						name="searchBox"
						onChange={this.handleSearch}
						value={searchQuery}
					/>
					<ArticlesTable data={articles} />
					<Pagination
						pageSize={pageSize}
						currentPage={currentPage}
						itemsCount={totalCount}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Articles;
