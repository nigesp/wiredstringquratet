var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - About Us', page_name: 'about-us'}, {content:{block: 'aboutus/about_us_content'}, specific_css:{block: 'aboutus/about_us_css'}});
});

module.exports = router;