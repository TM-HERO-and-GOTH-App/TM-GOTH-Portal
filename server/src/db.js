const mariadb = require('mariadb');

// Expose the Pool object within this module
module.exports = Object.freeze({
    pool: mariadb.createPool({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '1234',
    })
});
