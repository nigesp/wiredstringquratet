'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/* GET booking page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Booking', page_name: 'book'}, {content:{block: 'booking/booking_content'}, specific_css:{block: 'booking/booking_css'}});
});

router.post('/request', function(req, res, next) {
	console.log("POST request made:");
	console.log("First Name: " + req.body.firstName);
	//res.layout('layout', {title: 'WSQ - Booking', page_name: 'book'}, {content:{block: 'booking/booking_content'}, specific_css:{block: 'booking/booking_css'}});
	res.send("success");
	// send mail with defined transport object
	/*transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});*/
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Info - Wired String Quartet" <info@wiredstrings.co.za>', // sender address
    to: 'kendrahoofcare@gmail.com', // list of receivers
    subject: 'Booking request - Wired String Quartet', // Subject line
    text: 'Thank you for requesting a booking...', // plain text body
    html: '<b>Thank you for requesting a booking...</b>' // html body
};




module.exports = router;








