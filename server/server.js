const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const mysql = require('mysql');
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/public', 'index.html')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Server')
});

// const db = mysql.createPool({
//     host: "172.20.197.194",
//     port: 3306,
//     user: "hero_app",
//     password: "Pswd2022",
//     database: "HERO2.0_DEV"
// });

app.post("/case/insert", (req, res) => {
    const loggerName = req.body.loggerName
    const loggerPhone = req.body.loggerPhone
    const customerName = req.body.customerName
    const customerUsername = req.body.customerUsername
    const customerAccountNumber = req.body.customerAccountNumber
    const customerPhone = req.body.customerPhone
    const issue = req.body.issue
    const sqlInsert = "INSERT INTO TBL_CASE(logger_name, logger_phone_number, customer_name, customer_service_number, customer_account_number, customer_phone_number, issue, status) VALUES(?,?,?,?,?,?,?,'open', null)"
    db.query(sqlInsert, [loggerName, loggerPhone, customerName, customerUsername, customerAccountNumber, customerPhone, issue], (err, result) => {
        if(err) return console.log(err);
        console.log(result);
    });
});

const port = 3001
app.listen(port, () => {
    console.log("Running on port " + port)
});
