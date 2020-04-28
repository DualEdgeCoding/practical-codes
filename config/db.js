const sequelize = require("sequelize");

const db = new sequelize("vidjot", "itp211", "itp211", {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    },
    pool: {
        max:5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;