var express = require('express');
var router = express.Router();

/* GET Performance packages page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Packages', page_name: 'packages'}, {content:{block: 'packages/content'}, specific_css:{block: 'packages/css'}});
});

module.exports = router;