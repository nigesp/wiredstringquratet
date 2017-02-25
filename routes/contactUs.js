var express = require('express');
var router = express.Router();

/* GET Contact Us page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Contact Us', page_name: 'contact-us'}, {content:{block: 'contactus/contact_us_content'}, specific_css:{block: 'contactus/contact_us_css'}});
});

module.exports = router;