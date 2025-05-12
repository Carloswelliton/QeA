const Sequelize = require("sequelize");

const connection = new Sequelize("mysql://root:iwYVdUTmBsthdIrHlapMVcrpPBvEKeWv@mainline.proxy.rlwy.net:25785/railway", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
