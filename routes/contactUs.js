'use strict';
const nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/* GET Contact Us page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - Contact Us', page_name: 'contact-us'}, {content:{block: 'contactus/contact_us_content'}, specific_css:{block: 'contactus/contact_us_css'}});
});

/* POST contact email form*/
router.post('/', function(req, res, next) {
	
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
		let mailOptionsAutoReply = {
    		from: '"Anouk - Wired String Quartet" <anouk@wiredstrings.co.za>', // sender address
    		//to: 'nigesp@gmail.com', // list of receivers
    		to: req.body.email,
    		subject: 'Contact Us - Wired String Quartet', // Subject line
    		text: createAutoReplyTextContent(req), // plain text body
    		html: createAutoReplyHtmlContent(req) // html body
		};
		
		// send mail with defined transport object
		var autoReplySuccess = false;
		transporter.sendMail(mailOptionsAutoReply, (error, info) => {
			if (error) {
				//res.send("error");
			}
			//console.log('Message %s sent: %s', info.messageId, info.response);
			//res.send("success");
			autoReplySuccess = true;
		});
		
		let mailOptions = {
    		from: '"Website" <anouk@wiredstrings.co.za>', // sender address
    		//to: 'nigesp@gmail.com', // list of receivers
    		to: 'anouk@wiredstrings.co.za',
    		subject: 'Contact Us - Wired String Quartet', // Subject line
    		text: createTextContent(req), // plain text body
    		html: createHtmlContent(req) // html body
		};
		
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				//res.send("error");
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

function createTextContent(request) {
	var autoReplyText = 'Hi Nuks,\n' +
    		'\n' +
    		'You have received a contact us request:\n' +
    		'\n' +
    		'Name: ' + request.body.firstName + ' ' + request.body.lastName + ' \n' +
    		'Email Address: ' + request.body.email + ' \n' +
    		'Question: ' + request.body.message + '\n' +
    		'\n' +
    		'Chao.';
    return autoReplyText;
};

function createHtmlContent(request) {
	var autoReplyHtml = '<h1>Hi Nuks,</h1>' +
    		'<p>You have received a contact us request:</p>' +
    		'<p>' +
    		'Name: ' + request.body.firstName + ' ' + request.body.lastName + '<br/>' +
    		'Email Address: ' + request.body.email + '<br/>' +
    		'Question: ' + request.body.message + '\n' +
    		'</p>' +
    		'<p>Chao.</p>';
    return autoReplyHtml;
};

function createAutoReplyTextContent(request) {
	var autoReplyText = 'Hi ' + request.body.firstName + ',\n' +
    		'\n' +
    		'Thanks for getting in touch. I am currently away from my computer but will get back to you within the next 48hrs.\n' +
    		'\n' +
    		'In the mean time, feel free to have a listen to some of our music here: http://www.wiredstrings.co.za/listen \n' +
    		'\n' +
    		'Or read through our Frequently Asked Questions here: http://www.wiredstrings.co.za/faq \n' +
    		'\n' +
    		'Kind regards...\n' +
    		'Anouk Smit.\n' +
    		'\n' +
    		'Wired String Quartet \n' +
    		'Tel: +27 (0)21 789 2297 \n' +
    		'Mobile: +27 (0)82 480 9397';
    return autoReplyText;
};

function createAutoReplyHtmlContent(request) {
	var autoReplyHtml = '<h1>Hi ' + request.body.firstName + ',</h1>' +
    		'<p>Thanks for getting in touch. I am currently away from my computer but will get back to you within the next 48hrs.</p>' +
    		'<p>In the mean time, feel free to have a listen to some of our music here: http://www.wiredstrings.co.za/listen </p>' +
    		'<p>Or read through our Frequently Asked Questions here: http://www.wiredstrings.co.za/faq </p>' +
    		'<p>Kind regards...<br/>' +
    		'Anouk Smit.</p>' +
    		'<p>Wired String Quartet<br/>' +
    		'Tel:<a href="tel:+27217892297"> +27 (0)21 789 2297</a><br/>' +
    		'Mobile: <a href="tel:+27824809397">+27 (0)82 480 9397</a></p>';
    return autoReplyHtml;
};

module.exports = router;