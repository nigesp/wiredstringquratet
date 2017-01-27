var express = require('express');
var router = express.Router();

/* GET Listen page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Listen', page_name: 'listen'}, {content:{block: 'listen/content'}, specific_css:{block: 'listen/css'}});
});

module.exports = router;