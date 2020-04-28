const exp = require("express");
const router = exp.Router();
const User = require("../models/User");
const alertMessage = require("../helpers/messenger");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get('/register', (req, res) => {
	res.render("user/register");
});

router.post("/register", (req, res) => {
    let errors = [];

    let {name, email, password, password2} = req.body;
    
    if(password != password2){
        errors.push({text: "passwords do not match."});
    }

    if(password.length < 4) {
        errors.push({text: "password must be at least 4 characters"});
    }

    if(errors.length > 0) {
        res.render("user/register", {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ where: {email}})
            .then(user => {
                if(user){
                    res.render("user/register", {
                        error: user.email + " already registered",
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(password, salt, (err, hash) => {
                            User.create({ name, email, password: hash})
                            .then(user => {
                            alertMessage(res, "success", user.name + " added. Please login to continue.", "fas fa-sign-in-alt", true);
                            res.redirect("/login");
                            })
                            .catch(err => {
                                console.error(err);
                                res.sendStatus(500);
                            });
                        })
                    })
                }
            })
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/video/listVideos",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
});

module.exports = router;