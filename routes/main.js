const express = require('express');
const router = express.Router();
const alertMessage = require("../helpers/messenger");


router.get('/', (req, res) => {
	const title = 'Video Jotter';
	res.render('index', {title: title}); // renders views/index.handlebars
});

router.get('/login', (req, res) => {
	res.render("user/login");
});

router.get('/about', (req, res) => {
	var author = "Weebkun";
	alertMessage(res, 'success',
	'This is an important message', 'fas fa-sign-in-alt', true);
	res.render("about", {
		author : author
	});
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
