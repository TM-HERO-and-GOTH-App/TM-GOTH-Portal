const mariadb = require('mariadb');
const mysql = require('mysql');
const db = require('../db');

async function asyncFunction() {
    let conn;
    conn = await mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1234',
        database: 'emdev'
    });
    await conn.connect(function(err) {
        if (err) {
            console.error(`error connecting: ${err.stack}`)
        }
        console.log(`connected to id ('${conn.threadId}')`)
    })
    await conn.end();
    // await conn.query('select * from tbl_chat',
    //     function (err, res) {
    //         if (err) throw err;
    //         // connected
    //         console.log(res);
    //     })
}
asyncFunction();
