const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const Joi = require('joi');
require("dotenv").config({path: '../../.env'});

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

// SWITCH BETWEEN LOCAL AND DEV DB
const db = require('./db').localPool;
// const db = require('../db').pool;

// Test port if request received
const test = app.get('/', (req, res, next) => {
    res.status(200).send("Status Working");
    next();
})

// Chat =========================================================
app.post('/chat/push-message/', (req, res, next) => {
    const schema = Joi.object({
        cid: Joi.string().required(),
        message: Joi.string().min(1).max(300).required(),
        source: Joi.string().valid('GOTH', 'UNIFIBUDDY').required(),
        hbid: Joi.string().required(),
        gid: Joi.string().required(),
        picture: Joi.any()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return
    }

    db.getConnection((err, conn) => {
        if (err) throw err; // not connected
        conn.query("insert into tbl_chat(C_ID, MESSAGE, SOURCE, HB_ID, G_ID, PICTURE) values (?,?,?,?,?,?)",
            [req.body.cid, req.body.message, req.body.source, req.body.hbid, req.body.gid, req.body.picture],
            (err, result) => {
                res.send(result)
                conn.release()
                if (err) throw err;
            })
    })
})

app.get('/chat/pull-message/:cToken', (req, res) => {
    db.getConnection((err, conn) => {
        if (err) throw err; // not connected
        conn.query(`SELECT *
                    from tbl_chat
                    WHERE C_ID = ${req.params.cToken}`,
            (err, results) => {
                if (!results[0]) res.status(404).send('The message with the given CID is not found.')
                else res.send(results)
                conn.release();
                if (err) throw err;
            }
        )
    })
})

app.get('/chat/view-users-by-group/', (req, res) => {
    res.send('API for View User by Group');
})

// ================================================================

app.get('/case/update-case-status/', (req, res) => {
    res.send('API for Update Case Status')
})

app.get('/case/get-action-remark-list/', (req, res) => {
    res.send('API for Get Action Remark List')
})

app.get('/case/update-action-remark/', (req, res) => {
    res.send('API for Update Action Remark List')
})

app.get('/case/transfer-case-owner/', (req, res) => {
    res.send('API for Transfer Case Owner')
})

app.get('/case/assign-to-support/', (req, res) => {
    res.send('API for Case Assignment to Support')
})

app.get('/case/assign-case-to-me/', (req, res) => {
    res.send('API for Case Assignment to Me')
})

app.get('/case/reopen-case/', (req, res) => {
    res.send('API for Reopen Case')
})

app.get('/case/get-assignment-log/', (req, res) => {
    res.send('API for Get Assignment Log')
})

// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on ${port}...`));