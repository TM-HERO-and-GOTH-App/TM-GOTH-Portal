const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mariadb = require('mariadb')
const path = require('path');


app.use(express.static(path.resolve(__dirname, '../client/public', 'index.html')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
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

const localdb = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1234",
    database: "heroserver"
})

app.get('/api/getLoggerPool', (req, res) => {
    db.query("SELECT * FROM TBL_CASE;", (err, results, fields) => {
        if (err) throw err;
        res.send(results);
    });
})

app.post("/case/insert", (req, res) => {
    const H_ID = 1234
    const CASE_NUM = '1234'
    const OWNER_ID = 1234
    const OWNER_ID_SUPPORT = 1234
    const sqlInsert = "INSERT INTO TBL_CASE(H_ID, CASE_NUM, OWNER_ID, OWNER_ID_SUPPORT) VALUES(?,?,?,?)"
    localdb.query(sqlInsert, [H_ID, CASE_NUM, OWNER_ID, OWNER_ID_SUPPORT], (err, result) => {
        if(err) return console.log(err);
        console.log(result);
    });
});

app.listen(3002, () => {
    console.log("Running on port 3002")
});
