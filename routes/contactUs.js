var express = require('express');
var router = express.Router();

/* GET Contact Us page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Contact Us', page_name: 'contact-us'}, {content:{block: 'contactus/content'}, specific_css:{block: 'contactus/css'}});
});

module.exports = router;