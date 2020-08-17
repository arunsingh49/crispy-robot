import React from 'react';
import _ from 'lodash';

const Pagination = React.forwardRef(
	({ onPageChange, currentPage, pageSize, itemsCount }, ref) => {
		const pageCount = Math.ceil(itemsCount / pageSize);
		const pages = _.range(1, pageCount + 1);

		return (
			<nav ref={ref} aria-label="...">
				<ul className="pagination">
					{pages.map((p) => {
						return (
							<li
								key={p}
								className={
									currentPage === p
										? 'page-item active'
										: 'page-item'
								}
							>
								<button
									onClick={() => onPageChange(p)}
									className="btn btn-link page-link"
								>
									{p}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	},
);

export default Pagination;
