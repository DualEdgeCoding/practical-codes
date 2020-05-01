const express = require('express');
const router = express.Router();
const alertMessage = require("../helpers/messenger");
const ensureLoggedIn = require("../config/ensureLogIn");
const Video = require("../models/Video");

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

router.get("/delete/:id", ensureLoggedIn, (req, res) => {
    Video.findOne({where: {id: req.params.id, userId: req.user.id}})
    .then(video => {
        if(video != null){
            Video.destroy({where:{id: req.params.id}}).then(video => {
                req.flash("successMsg", "Video successfully deleted.");
                res.redirect("/video/listVideos");
            })
        } else {
            req.flash("error", "You do not have access to this video.");
            res.redirect("/");
        }
    })
});

module.exports = router;
