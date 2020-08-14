import '../css/header.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onClick }) => {
	return (
		<header id="header">
			<div className="menu_area">
				<nav
					className="navbar navbar-default navbar-fixed-top"
					role="navigation"
				>
					<div className="lsw-wrapper">
						<div className="navbar-header">
							<Link className="navbar-brand" to="/">
								<i className="fa fa-heartbeat"></i>
								<span>Wellnez</span>
							</Link>
						</div>
						<div
							id="navbar"
							className="navbar-collapse collapse"
							aria-expanded="false"
						>
							<ul
								id="top-menu"
								className="nav navbar-nav navbar-right main-nav"
							>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link
										onClick={onClick}
										to="/ls/weight-loss"
									>
										Weight Loss
									</Link>
								</li>
								<li>
									<Link onClick={onClick} to="/ls/running">
										Running
									</Link>
								</li>
								<li>
									<Link onClick={onClick} to="/ls/herbs">
										Herbs
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
