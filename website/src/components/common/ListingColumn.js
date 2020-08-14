import React from 'react';
import { Link } from 'react-router-dom';

const ListingColumn = ({ data }) => {
	return (
		<div className="blog-content">
			{data.map((item) => (
				<Link key={item._id} to={`../../${item.urlTitle}`}>
					<div className="single-Blog">
						<div className="single-blog-right">
							<div className="blog-img-listing">
								<figure className="blog-figure">
									<img alt="img" src={item.headerImagePath} />
									<span className="image-effect"></span>
								</figure>
							</div>
							<div className="blog-content">
								<figcaption className="blog-listing-caption">
									<div className="av-inner-masonry-content-pos-content">
										<h3 itemProp="headline">
											{item.title}
										</h3>
										<div
											className="listing-summary-content"
											itemProp="text"
										>
											{item.summary}
										</div>
									</div>
								</figcaption>
							</div>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ListingColumn;
