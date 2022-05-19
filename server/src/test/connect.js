const mariadb = require('mariadb');
const {NodeSSH} = require('node-ssh')

const ssh = new NodeSSH()

async function asyncFunction() {
    let conn;
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: '172.20.197.194',
            port: '3306',
            user: 'hero_app',
            password: 'Pswd2022',
        });

        // Print connection thread
        console.log(`Connected! (id=${conn.threadId})`);
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Close connection
        if (conn) await conn.close();
    }
}

asyncFunction();
