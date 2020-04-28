const mydb = require("./db");
const user = require("../models/User");
const video = require("../models/Video");

const setUpDb = (drop) => {
    mydb.authenticate()
        .then(() => {
            console.log("database connection successful.");
        })
        .then(() => {
            user.hasMany(video);
            mydb.sync({
                force: drop
            }).then(() => {
                console.log("created table")
            })
        }).catch(err => console.error(err));
}

module.exports = {setUpDb};