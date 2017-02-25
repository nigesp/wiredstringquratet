var express = require('express');
var router = express.Router();

/* GET FAQ page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - FAQ', page_name: 'faq'}, {content:{block: 'faq/faq_content'}, specific_css:{block: 'faq/faq_css'}});
});

module.exports = router;