import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends React.Component {
	render() {
		const { user } = this.props;
		return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="/home">
					Wellnez
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink className="nav-link" to="/articles">
								Articles{' '}
								<span className="sr-only">(current)</span>
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/categories">
								Categories
							</NavLink>
						</li>
						{!user && (
							<React.Fragment>
								<li>
									<NavLink
										className="nav-item nav-link"
										to="/login"
									>
										Login
									</NavLink>
								</li>
								<li>
									<NavLink
										className="nav-item nav-link"
										to="/register"
									>
										Register
									</NavLink>
								</li>
							</React.Fragment>
						)}
						{user && (
							<React.Fragment>
								<li>
									<NavLink
										className="nav-item nav-link"
										to="/profile"
									>
										{user.name}
									</NavLink>
								</li>
								<li>
									<NavLink
										className="nav-item nav-link"
										to="/logout"
									>
										Logout
									</NavLink>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
