const exp = require("express");
const router = exp.Router();

router.get('/register', (req, res) => {
	res.render("user/register");
});

router.post("/register", (req, res) => {
    let errors = [];
    let successMsg = "";

    var successful = true;

    if(req.body.password.length < 4){
        errors.push({text: "Password must be at least 4 characters."})
        successful = false;
    }
    if(req.body.password != req.body.password2) {
        errors.push({text: "Passwords do not match."});
        successful = false;
    }

    if(successful){
        successMsg = `${req.body.email} successfully created.`;
        res.render("/login", {successMsg});
    } else {
        res.render("user/register", {
            errors,
            name : req.body.name,
            email : req.body.email,
            pw : req.body.password,
            cfmpw : req.body.password2
        });
    }
    
});

module.exports = router;