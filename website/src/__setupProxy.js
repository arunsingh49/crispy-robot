const proxy = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(proxy(['/api/articles'], { target: 'http://localhost:9000' }));
};
