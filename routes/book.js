var express = require('express');
var router = express.Router();

/* GET booking page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Booking', page_name: 'book'}, {content:{block: 'booking/content'}, specific_css:{block: 'booking/css'}});
});

module.exports = router;