import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ data }) => {
	return (
		<div className="row">
			<div className="col-lg-12 col-md-12">
				<div className="blog-breadcrumbs-area">
					<div>
						<div className="blog-breadcrumbs-left">
							<ol className="breadcrumb">
								{data.map((item) => {
									return (
										<li
											key={item.id}
											className={
												item.isActive ? 'active' : ''
											}
										>
											<Link to={item.url}>
												{item.name}
											</Link>
										</li>
									);
								})}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BreadCrumbs;
