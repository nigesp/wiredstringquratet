var express = require('express');
var router = express.Router();

/* GET FAQ page. */
router.get('/', function(req, res, next) {
	res.layout('layout', {title: 'WSQ - FAQ', page_name: 'faq'}, {content:{block: 'faq/faq_content'}, specific_css:{block: 'faq/faq_css'}});
});

/* POST FAQ email form */
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
		let mailOptions = {
    		from: '"Anouk - Wired String Quartet" <anouk@wiredstrings.co.za>', // sender address
    		//to: 'nigesp@gmail.com', // list of receivers
    		to: req.body.email,
    		subject: 'Question - Wired String Quartet', // Subject line
    		text: 'Thank you for your question...', // plain text body
    		html: '<b>Thank you for your question...</b>' // html body
		};
		
		// send mail with defined transport object
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

module.exports = router;