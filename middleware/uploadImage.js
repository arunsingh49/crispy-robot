const multer = require('multer');
const fs = require('fs');
const config = require('config');

const port = process.env.PORT || config.get('defaultPort');
const server = `${config.get('server')}:${port}/`;

const imgPath = config.get('imgFolderDefault');

module.exports = (req, res, next) => {
	try {
		uploadImg()(req, res, function(err) {
			if (err instanceof multer.MulterError) {
				// A Multer error occurred when uploading.
				return res
					.status(401)
					.send(`Multer Error while uploading file: ${err}`);
			} else if (err) {
				// An unknown error occurred when uploading.
				res.status(400).send(
					`Error while uploading file: ${err.message}`,
				);
			}
			next();
		});
	} catch (ex) {
		console.log('in catch: ', ex);
		next();
	}
};

/**************** Private Functions - (can be put in a seperate file when required) (START)*******************/
function uploadImg() {
	const storage = multer.diskStorage({
		destination,
		filename,
	});

	const upload = multer({ storage, fileFilter });
	return upload.single('image');
}

function fileFilter(req, file, cb) {
	if (
		file.mimetype === 'image/jpeg' ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/gif'
	)
		cb(null, true);
	else {
		cb(
			new Error(
				'File type not supported. Plase upload an image file - with following extensions only: .jpeg, .jpg, .png or .gif',
			),
		);
	}
}

function destination(req, file, cb) {
	const dir = `./${imgPath}${req.body.urlTitle}/`;

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	cb(null, dir);
}

function filename(req, file, cb) {
	console.log('req.body - ', req.body);
	console.log('file - ', file);
	const fullImgPath = `${server}${imgPath}${req.body.urlTitle}`;

	req.body.image = `${fullImgPath}/${file.originalname}`;

	cb(null, file.originalname);
}
/**************** Private Functions - (can be put in a seperate file when required) (END)*******************/
