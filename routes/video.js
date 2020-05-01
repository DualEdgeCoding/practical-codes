const express = require("express");
const router = express.Router();
const moment = require("moment");
const Video = require("../models/Video");

function ensureLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();

    req.flash("errorMsg", "You need to be logged in.");
    res.redirect("/login");
}

router.get("/listVideos", ensureLoggedIn, (req, res) => {
    Video.findAll({
        where: {userId: req.user.id},
        order: [["title", "ASC"]],
        raw: true
    }).then(videos => res.render("video/listVideos", {videos}))
    .catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
});

router.get("/addVideo", ensureLoggedIn, (req, res) => {
    res.render("video/addVideo");
});

router.post("/addVideo", (req, res) => {
    let title = req.body.title;
    let story = req.body.story.slice(0, 1999);
    let dateRelease = moment(req.body.dateRelease, "DD/MM/YYYY");
    let language = req.body.language.toString();
    let subtitles = req.body.subtitles == undefined ? "": req.body.subtitles.toString();
    let classification = req.body.classification;
    let userId = req.user.id;

    Video.create({
       title,
       story,
       dateRelease,
       language,
       subtitles,
       classification,
       userId
    }).then(video => res.redirect("/video/listVideos"))
    .catch(err => {
        console.error(err);
        res.sendStatus(500);
    });
});
module.exports = router;