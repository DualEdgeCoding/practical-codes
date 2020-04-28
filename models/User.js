const sequelize = require("sequelize");
const db = require("../config/db");

const User = db.define("user", {
    name: {type: sequelize.STRING},
    email: {type:sequelize.STRING},
    password: {type: sequelize.STRING}
});

module.exports = User;