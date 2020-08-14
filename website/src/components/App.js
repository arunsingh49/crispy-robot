import './css/style.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import BlogHome from './blog/BlogHome';
import BlogListing from './blog/BlogListing';
import BlogProfile from './blog/BlogProfile';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/ls/:category" component={BlogListing} />
					<Route path="/:id" component={BlogProfile} />
					<Route path="/" component={BlogHome} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
