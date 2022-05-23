const mysql = require('mysql');
require("dotenv").config({ path: '../../.env' });

// Expose the Pool object within this module
const db_config = {
    localPool: mysql.createPool({
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }),
    pool: mysql.createPool({
        host: "172.20.197.194",
        port: 3306,
        user: "hero_app",
        password: "Pswd2022",
        database: "HERO2.0_DEV"
    })
}
module.exports = db_config
