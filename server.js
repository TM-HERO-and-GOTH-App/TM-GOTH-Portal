const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('ssh2');
const sshClient = new Client();
const Tunnel = require('tunnel-ssh');
const mysql = require('mysql');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/public', 'index.html')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Server')
});

const db = mysql.createPool({
    host: "172.20.197.194",
    port: 3306,
    user: "hero_app",
    password: "Pswd2022",
    database: "HERO2.0_DEV"
});

const tunnelConfig = {
    host: "172.21.114.29",
    port: 22,
    username: "XL217019",
    password: "XL217019"
}
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: "172.20.197.194",
    dstPort: "3306"
};

app.post("/case/insert", (req, res) => {
    const loggerName = req.body.loggerName
    const loggerPhone = req.body.loggerPhone
    const customerName = req.body.customerName
    const customerUsername = req.body.customerUsername
    const customerAccountNumber = req.body.customerAccountNumber
    const customerPhone = req.body.customerPhone
    const issue = req.body.issue
    const sqlInsert = "INSERT INTO TBL_CASE_copy(logger_name, logger_phone_number, customer_name, customer_service_number, customer_account_number, customer_phone_number, issue, status) VALUES(?,?,?,?,?,?,?,'open', null)"
    db.query(sqlInsert, [loggerName, loggerPhone, customerName, customerUsername, customerAccountNumber, customerPhone, issue], (err, result) => {
        if(err) return console.log(err);
        console.log(result);
    });
});

// sshClient.on('ready', () => {
//     console.log('Client :: ready');
//     sshClient.exec('uptime', (err, stream) => {
//       if (err) throw err;
//       stream.on('close', (code, signal) => {
//         console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
//         sshClient.end();
//       }).on('data', (data) => {
//         console.log('STDOUT: ' + data);
//       }).stderr.on('data', (data) => {
//         console.log('STDERR: ' + data);
//       });
//     });
//   }).connect(tunnelConfig);



// function(server) {
//     return new Object({
//             tunnelPort: 3307,          // can really be any free port used for tunneling

//             /**
//              * DB server configuration. Please note that due to the tunneling the server host
//              * is localhost and the server port is the tunneling port. It is because the tunneling
//              * creates a local port on localhost
//              */
//             dbServer: dbServer,

//             /**
//              * Default configuration for the SSH tunnel
//              */
//             tunnelConfig: {
//                 remoteHost: '172.20.197.194', // mysql server host
//                 remotePort: 3306, // mysql server port
//                 verbose: true, // dump information to stdout
//                 disabled: false, //set this to true to disable tunnel (useful to keep architecture for local connections)
//                 sshConfig: tunnelConfig
//             },

//             /**
//              * Initialise the mysql connection via the tunnel. Once it is created call back the caller
//              *
//              * @param callback
//              */
//             init: function (callback) {
//                 /* tunnel-ssh < 1.0.0
//                 //
//                 // SSH tunnel creation
//                 // tunnel-ssh < 1.0.0
//                 var me = this;
//                 me.tunnel = new Tunnel(this.tunnelConfig);
//                 me.tunnel.connect(function (error) {
//                     console.log('Tunnel connected', error);
//                     //
//                     // Connect to the db
//                     //
//                     me.connection = me.connect(callback);

//                 });
//                 */

//                 /* tunnel-ssh 1.1.0 */
//                 //
//                 // SSH tunnel creation
//                 //
//                 var me = this;

//                 // Convert original Config to new style config:
//                 var config = this.tunnelConfig;

//                 var newStyleConfig = {
//                     username: config.sshConfig.username,
//                     port: config.sshConfig.port,
//                     host: config.sshConfig.host,
//                     // SSH2 Forwarding...
//                     dstPort: config.remotePort,
//                     dstHost: config.remoteHost,
//                     srcPort: config.localPort,
//                     srcHost: config.localHost,
//                     // Local server or something...
//                     localPort: config.localPort,
//                     localHost: config.localHost,
//                     privateKey: config.privateKey
//                 }


//                 me.tunnel = tunnel(newStyleConfig, function (err) {
//                     console.log('Tunnel connected', err);
//                     if (err) {
//                         return callback(err);
//                     }

//                     me.connection  = me.connect(callback);
//                 });
//             },

//             /**
//              * Mysql connection error handling
//              *
//              * @param err
//              */
//             errorHandler: function (err) {

//                 var me = this;
//                 //
//                 // Check for lost connection and try to reconnect
//                 //
//                 if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                     console.log('MySQL connection lost. Reconnecting.');
//                     me.connection = me.connect();
//                 } else if (err.code === 'ECONNREFUSED') {
//                     //
//                     // If connection refused then keep trying to reconnect every 3 seconds
//                     //
//                     console.log('MySQL connection refused. Trying soon again. ' + err);
//                     setTimeout(function () {
//                         me.connection = me.connect();
//                     }, 3000);
//                 }
//             },

//             /**
//              * Connect to the mysql server with retry in every 3 seconds if connection fails by any reason
//              *
//              * @param callback
//              * @returns {*} created mysql connection
//              */
//             connect: function (callback) {

//                 var me = this;
//                 //
//                 // Create the mysql connection object
//                 //
//                 var connection = mysql.createConnection(me.dbServer);
//                 connection.on('error', me.errorHandler);
//                 //
//                 // Try connecting
//                 //
//                 connection.connect(function (err) {
//                     if (err) throw err;
//                     console.log('Mysql connected as id ' + connection.threadId);
//                     if (callback) callback();
//                 });

//                 return connection;
//             }
//         }
//     );

// };

const port = 3001
app.listen(port, () => {
    console.log("Running on port " + port)
});
