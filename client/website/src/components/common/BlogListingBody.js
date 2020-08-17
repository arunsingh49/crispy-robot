import React from 'react';
import Pagination from './Pagination';
import ListingColumn from './ListingColumn';
import BreadCrumbs from './BreadCrumbs';

class BlogListingBody extends React.Component {
	constructor(props) {
		super(props);
		this.paginationRef = React.createRef();
	}
	render() {
		const {
			data,
			breadCrumbsData,
			onPageChange,
			currentPage,
			pageSize,
			itemsCount,
		} = this.props;
		return (
			<div className="col-md-8 col-sm-8 col-xs-12">
				<div className="list-title">
					<h3>
						Running | A Good Run can do Amazing Things for You, Run
						and Stay Fit
					</h3>
				</div>
				<BreadCrumbs data={breadCrumbsData} />
				<ListingColumn data={data} />
				<Pagination
					onPageChange={onPageChange}
					currentPage={currentPage}
					pageSize={pageSize}
					itemsCount={itemsCount}
					ref={this.paginationRef}
				/>
			</div>
		);
	}
}

export default BlogListingBody;
