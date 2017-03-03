'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/* GET booking page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Booking', page_name: 'book'}, {content:{block: 'booking/booking_content'}, specific_css:{block: 'booking/booking_css'}});
});

router.post('/request', function(req, res, next) {
	// Validate form input:
	req.checkBody("firstName", "First Name is required").notEmpty();
	req.checkBody("lastName", "Last Name is required").notEmpty();
	req.checkBody("email", "Please enter a valid email address").isEmail();
	
	// Check validation object for errors.
	var errors = req.validationErrors();
	
	if(errors) {
		res.status(200).send(errors);
	} else {
		// setup email data with unicode symbols
		let mailOptions = {
    		from: '"Anouk - Wired String Quartet" <anouk@wiredstrings.co.za>', // sender address
    		//to: 'nigesp@gmail.com', // list of receivers
    		to: req.body.email,
    		subject: 'Booking request - Wired String Quartet', // Subject line
    		text: 'Thank you for requesting a booking...', // plain text body
    		html: '<b>Thank you for requesting a booking...</b>' // html body
		};
		
		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.send("error");
			}
			//console.log('Message %s sent: %s', info.messageId, info.response);
			res.send("success");
		});
	}
});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.wiredstrings.co.za',
    port: process.env.SMTP_PORT,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

module.exports = router;








