const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");

function localStrategy(pp){
    pp.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
        User.findOne({where: {email}})
            .then(user => {
                if(!user) {
                    return done(null, false, {message: "no user found."});
                }
                bcrypt.compare(password, user.password, (err, match) => {
                    if(err) throw err;
                    if(match){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "password incorrect."});
                    }
                })
            })
    }));

    pp.serializeUser((user, done) => {
        done(null, user.id);
    });

    pp.deserializeUser((userId, done) => {
        User.findByPk(userId)
        .then(user => {
            done(null, user);
        })
        .catch(err => console.error(err));
    });
}

module.exports = {localStrategy};