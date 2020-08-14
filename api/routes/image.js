const express = require('express');
const router = express.Router();

const uploadImage = require('../middleware/uploadImage');

router.post('/', uploadImage, (req, res, next) => {
	console.log('image route req.body', req.body);
	res.send(req.body.image);
});

module.exports = router;
