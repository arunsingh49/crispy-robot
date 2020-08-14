import React from 'react';
import _ from 'lodash';

const Pagination = ({ pageSize, currentPage, itemsCount, onPageChange }) => {
	const pageCount = Math.ceil(itemsCount / pageSize);
	const pages = _.range(1, pageCount + 1);

	return (
		<nav aria-label="...">
			<ul className="pagination">
				{pages.map((p) => {
					return (
						<li
							key={p}
							className={
								p === currentPage
									? 'page-item active'
									: 'page-item'
							}
						>
							<button
								className="btn btn-link page-link"
								onClick={() => onPageChange(p)}
							>
								{p}
							</button>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Pagination;
