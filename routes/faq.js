var express = require('express');
var router = express.Router();

/* GET FAQ page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - FAQ', page_name: 'faq'}, {content:{block: 'faq/content'}, specific_css:{block: 'faq/css'}});
});

module.exports = router;