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
		let autoReplyMailOptions = {
    		from: '"Anouk - Wired String Quartet" <anouk@wiredstrings.co.za>', // sender address
    		//to: 'nigesp@gmail.com', // list of receivers
    		to: req.body.email,
    		subject: 'Booking request - Wired String Quartet', // Subject line
    		text: createAutoReplyTextContent(req), // plain text body
    		html: createAutoReplyHtmlContent(req) // html body
		};
		
		// send mail with defined transport object
		var autoReplySuccess = false;
		transporter.sendMail(autoReplyMailOptions, (error, info) => {
			if (error) {
				//res.send("error");
			}
			//console.log('Message %s sent: %s', info.messageId, info.response);
			//res.send("success");
			autoReplySuccess = true;
		});
		
		// setup email data with unicode symbols
		let mailOptions = {
    		from: '"Website" <anouk@wiredstrings.co.za>', // sender address
    		to: 'anouk@wiredstrings.co.za', // list of receivers
    		subject: 'Booking request', // Subject line
    		text: createBookingRequestTextContent(req), // plain text body
    		html: createBookingRequestHtmlContent(req) // html body
		};
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.send("error");
			}
			//console.log('Message %s sent: %s', info.messageId, info.response);
			res.send("success");
		});
		
		//TODO: Send Anouk an email.
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

function createBookingRequestTextContent(request) {
	var autoReplyText = 'Hi Nuks,\n' +
    		'\n' +
    		'You have received a booking request:\n' +
    		'\n' +
    		'Name: ' + request.body.firstName + ' ' + request.body.lastName + ' \n' +
    		'Email Address: ' + request.body.email + ' \n' +
    		'Date: ' + request.body.date + '\n' +
    		'Time: ' + request.body.time + '\n' +
    		'Duration: ' + request.body.duration + '\n' +
    		'Question: ' + request.body.message + '\n' +
    		'\n' +
    		'Congrats, now seal the deal ;-)';
    return autoReplyText;
};

function createBookingRequestHtmlContent(request) {
	var autoReplyHtml = '<h1>Hi Nuks,</h1>' +
    		'<p>You have received a booking request:</p>' +
    		'<p>' +
    		'Name: ' + request.body.firstName + ' ' + request.body.lastName + '<br/>' +
    		'Email Address: ' + request.body.email + '<br/>' +
    		'Date: ' + request.body.date + '\n' +
    		'Time: ' + request.body.time + '\n' +
    		'Duration: ' + request.body.duration + '\n' +
    		'Question: ' + request.body.message + '\n' +
    		'</p>' +
    		'<p>Congrats, now seal the deal ;-)</p>';
    return autoReplyHtml;
};

function createAutoReplyTextContent(request) {
	var autoReplyText = 'Hi ' + request.body.firstName + ',\n' +
    		'\n' +
    		'Thank you for completing the booking request form on our website. I am delighted that you are considering Wired String Quartet to make your event even more special. I am currently away from my computer but will get in touch with you within the next 48hrs to confirm our availability for the date you selected and answer any questions you may have asked.\n' +
    		'\n' +
    		'In the meantime, feel free to have a listen to some of our music here: http://www.wiredstrings.co.za/listen \n' +
    		'\n' +
    		'Or read through our Frequently Asked Questions here: http://www.wiredstrings.co.za/faq \n' +
    		'\n' +
    		'I look forward to working closely with you in creating an unforgettable event.\n' +
    		'Kind regards\n' +
    		'Anouk Smit\n' +
    		'\n' +
    		'Wired String Quartet \n' +
    		'Tel: +27 (0)21 789 2297 \n' +
    		'Mobile: +27 (0)82 480 9397';
    return autoReplyText;
};

function createAutoReplyHtmlContent(request) {
	var autoReplyHtml = '<h1>Hi ' + request.body.firstName + ',</h1>' +
    		'<p>Thank you for completing the booking request form on our website. I am delighted that you are considering Wired String Quartet to make your event even more special. I am currently away from my computer but will get in touch with you within the next 48hrs to confirm our availability for the date you selected and answer any questions you may have asked.</p>' +
    		'<p>In the meantime, feel free to have a listen to some of our music here: http://www.wiredstrings.co.za/listen </p>' +
    		'<p>Or read through our Frequently Asked Questions here: http://www.wiredstrings.co.za/faq </p>' +
    		'<p>I look forward to working closely with you in creating an unforgettable event.</p>' +
    		'<p>Kind regards<br/>' +
    		'Anouk Smit</p>' +
    		'<p>Wired String Quartet<br/>' +
    		'Tel:<a href="tel:+27217892297"> +27 (0)21 789 2297</a><br/>' +
    		'Mobile: <a href="tel:+27824809397">+27 (0)82 480 9397</a></p>';
    return autoReplyHtml;
};


module.exports = router;








