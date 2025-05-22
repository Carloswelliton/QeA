const Sequelize = require("sequelize");

const connection = new Sequelize("mysql://root:vdhEPRQAkbvDlAZrYfFQRiWMAswcOhGB@nozomi.proxy.rlwy.net:45775/railway", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;
