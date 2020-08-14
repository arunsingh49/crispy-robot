const express = require('express');
const categories = require('../routes/categories');
const articles = require('../routes/articles');
const relatedArticles = require('../routes/relatedArticles');
const users = require('../routes/users');
const auth = require('../routes/auth');
const image = require('../routes/image');
const error = require('../middleware/error');

module.exports = (app) => {
	app.use(express.json());

	app.use('/public', express.static('public'));
	app.use('/api/categories', categories);
	app.use('/api/articles', articles);
	app.use('/api/articles/related', relatedArticles);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/image', image);
	app.use(error);
};
