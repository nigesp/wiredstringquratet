var express = require('express');
var multer  = require('multer')
var mime = require('mime-types')
var fs = require('fs');
var path = require('path');

var router = express.Router();
var pathToCssFile = path.join(__dirname, '/../', 'public/stylesheets/textOnly.css');
var backgroundImageName;
var replacementCss = 'background-image: url("../images/header/';
	
var storage = multer.diskStorage({
	destination: function(req, file, callBack) {
		callBack(null, 'public/images/header/');
	},
	filename: function(req, file, callBack) {
		backgroundImageName = file.fieldname + '.' + mime.extension(file.mimetype);
		callBack(null, backgroundImageName);
	}
});

var upload = multer({ 
	storage: storage,
	fileFilter: fileFilter
}).single('txtOnlyBackgroundImage');


/* GET text only home page. */
router.get('/', function(req, res, next) {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	res.layout('layout', {title: 'Wired String Quartet', page_name: 'home'}, {content:{block: 'text_only/content'}, specific_css:{block: 'text_only/css'}});
});

router.get('/uploadImage', function(req, res, next) {
	res.render('uploadTextOnlyImage', {title: 'Image upload'});
});

router.post('/uploadImage', function(req, res, next) {
	upload(req, res, function(err) {
		if(err) {
			//console.log(err);
			return;
		}
		
		//Update textOnly.css
		var css = fs.readFileSync(pathToCssFile, 'UTF-8');
		var pattern = /background-image: url\(\"..\/images\/header\/txtOnlyBackgroundImage.[a-z]{3,4}"\);/;
		var newCss = css.replace(pattern, replacementCss + backgroundImageName + '");');
		fs.writeFile(pathToCssFile, newCss, (err) => {
  			if (err) throw err;
  			res.redirect('/text_only');	
		});
	});
});

//Only accepts jpeg image files.
function fileFilter(req, file, callBack) {
	if(file.mimetype === "image/jpeg" ||
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/tiff') {
		callBack(null, true);
	} else {
		callBack(null, false);
	}
}

module.exports = router;