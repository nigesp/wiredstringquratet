var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'Wired String Quartet', page_name: 'home'}, {content:{block: 'home/home_content'}, specific_css:{block: 'home/home_css'}});
});


module.exports = router;