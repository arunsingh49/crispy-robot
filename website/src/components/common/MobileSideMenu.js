import React from 'react';

const MobileSideMenu = () => {
	return (
		<React.Fragment>
			<ul className="navigation">
				<li className="nav-item">
					<a href="http://www.wellnez.in">Home</a>
				</li>
				<li className="nav-item">
					<a href="../ls/weight-loss">Weight Loss</a>
				</li>
				<li className="nav-item">
					<a href="../ls/running">Running</a>
				</li>
				<li className="nav-item">
					<a href="../ls/herbs">Herbs</a>
				</li>
				<li className="nav-item">
					<a href="../ls/garlic">Garlic</a>
				</li>
				<li className="nav-item">
					<a href="../ls/turmeric">Turmeric</a>
				</li>
			</ul>

			<input type="checkbox" id="nav-trigger" className="nav-trigger" />
			<label htmlFor="nav-trigger" className="nav-menu-toggle"></label>
		</React.Fragment>
	);
};

export default MobileSideMenu;
