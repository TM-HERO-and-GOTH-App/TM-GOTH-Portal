const mysql = require('mysql');

// Expose the Pool object within this module
const db_config = {
    localPool: mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1234',
        database: 'emdev'
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
