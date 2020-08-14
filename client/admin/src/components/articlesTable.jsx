import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './common/table';

class ArticlesTable extends Component {
	columns = [
		{
			path: 'title',
			label: 'Title',
			content: (article) => (
				<Link to={`/articles/${article._id}`}>{article.title}</Link>
			),
		},
		{ path: 'category.name', label: 'Category' },
		{
			path: 'createdOn',
			label: 'Created On',
		},
	];
	render() {
		const { data } = this.props;
		return <Table columns={this.columns} data={data} />;
	}
}

export default ArticlesTable;
