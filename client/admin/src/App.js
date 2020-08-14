import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Articles from './components/articles';
import ArticleForm from './components/articleForm';
import LoginForm from './components/loginForm';
import LogoutForm from './components/common/logout';
import RegisterForm from './components/registerForm';
import NotFound from './components/common/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import Navbar from './components/common/navbar';
import auth from './services/authService';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

class App extends Component {
	state = {};
	async componentDidMount() {
		const user = await auth.getCurrentUser();
		this.setState({ user });
	}
	render() {
		const { user } = this.state;
		return (
			<React.Fragment>
				<ToastContainer />
				<Navbar user={user} />
				<div className="container">
					<Switch>
						<ProtectedRoute
							path="/articles/:id"
							component={ArticleForm}
						/>
						<Route
							path="/articles/"
							render={(props) => (
								<Articles {...props} user={this.state.user} />
							)}
						/>
						<Route path="/login/" component={LoginForm} />
						<Route path="/logout/" component={LogoutForm} />
						<Route path="/register" component={RegisterForm} />
						<Route path="/not-found" component={NotFound} />
						<Redirect path="/" exact to="/articles" />
						<Redirect to="/not-found" />
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default App;
