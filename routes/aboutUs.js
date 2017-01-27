var express = require('express');
var router = express.Router();

/* GET About Us page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - About Us', page_name: 'about-us'}, {content:{block: 'aboutus/content'}, specific_css:{block: 'aboutus/css'}});
});

module.exports = router;