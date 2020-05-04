const sequelize = require("sequelize");
const db = require("../config/db");

const Video = db.define("video", {
    title: {type: sequelize.STRING},
    story: {type:sequelize.STRING(2000)},
    language: {type: sequelize.STRING},
    subtitles: {type:sequelize.STRING},
    classification: {type: sequelize.STRING},
    dateRelease: {type: sequelize.DATE},
    poster: {type:sequelize.STRING},
    starring: {type: sequelize.STRING}
});

module.exports = Video;