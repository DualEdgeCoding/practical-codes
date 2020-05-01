function ensureLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next();

    req.flash("errorMsg", "You need to be logged in.");
    res.redirect("/login");
}

module.exports = ensureLoggedIn;