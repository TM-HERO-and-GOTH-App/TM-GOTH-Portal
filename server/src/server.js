const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const Joi = require('joi');
require("dotenv").config({ path: '../../.env' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const localDB = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: 3308,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

app.get('/', (req, res) => {
    res.send('Hello from Server')
});

// Dashboard API =============

app.post('/dashboard/total-case-by-state', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required(),
        startDate: Joi.string().min(10).max(10).required(),
        endDate: Joi.string().min(10).max(10).required(),
        category: Joi.string().required()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const getCaseByState = localDB.query('CALL Get_Total_Case_By_State(:startDate,:endDate,:category);', (err, dbResult) => {
        if (err) {
            return err
        }
        res.status(200).send(dbResult)
    })

    return getCaseByState;
});

app.post('/dashboard/total-user-by-state', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required(),
        startDate: Joi.string().required(),
        endDate: Joi.string().required()
    })

    const result = schema.valid(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    const getTotalUserByState = localDB.query('CALL Get_Total_Hero_By_State(:startDate,:endDate)', (err, dbResult) => {
        if (err) {
            return err;
        }
        res.status(200).send(dbResult)
    })

    return getTotalUserByState;
});

app.post('/dashboard/get-total-case-by-group', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required(),
        shID: Joi.number().when(shID, {not: 0, then: Joi.required()}),
        gID: Joi.number().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    const getGroupDashboardCase = localDB.query('CALL Get_Total_Case_By_Stakeholder(:hID,:shID)', (err, dbResult) => {
        if (err) {
            return err;
        }
        res.status(200).send(dbResult)
    })
});

app.post('/dashboard/get-total-case-by-owner', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    const getOwnerDashboardCases = localDB.query('SELECT VALIDATE_TOKEN(:authToken)', (dbErr, dbResult) => {
        if (err) {
            return err;
        }
        res.status(200).send(dbResult)
    })
});

app.post('/dashboard/get-total-case-by-stakeholder', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string.min(32).max(40).required(),
        shID: Joi.number().when(shID, {not: 0, then: Joi.required()}),
        gID: Joi.number().required()
    });

    const result = schema.validate(req.body)
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }
    if (0 === shID) {
        const JSONresponseMessage = "Error during Token validation!";
        const JSONdata = "[{\"response\":\"FAILED\",\"status\":\"" + JSONresponseMessage + "\"}]";
        return JSONdata;
    }

    const getTotalStakeholderDashboardCase = localDB.query('CALL Get_Total_Case_By_Stakeholder(:hID,:shID)', (dbErr, dbResult) => {
        if (err) {
            return err;
        }
        res.status(200).send(dbResult)
    })
    return getTotalStakeholderDashboardCase;
});

app.post('/dashboard/get-total-case-resolved-by-owner', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).when(authToken, {not: 0, then: Joi.required()}),
        days: Joi.number().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    localDB.query('SELECT GET_TOTAL_RESOLVED_BY_AGENT(:ownerID, :days)', (dbErr, dbResult) => {
        if(dbErr){
            res.send(400).send(dbErr);
            return;
        }
        return res.send(dbResult);
    })
});

app.post('/dashboard/get-total-case-resolved-by-group', (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required(),
        shID: Joi.number().when(shID, {not: 0, then: Joi.required()}),
        days: Joi.number().required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    localDB.query('SELECT GET_TOTAL_RESOLVED_BY_GROUP(:shID, :days)', (dbErr, dbResult) => {
        if(dbErr){
            res.send(400).send(dbErr);
            return;
        }
        return res.send(dbResult);
    })
});

// ============

// app.post("/case/insert", (req, res) => {
//     const H_ID = 1234
//     const CASE_NUM = 1234
//     const OWNER_ID = 1234
//     const OWNER_ID_SUPPORT = 1234
//     const sqlInsert = "INSERT INTO TBL_CASE(H_ID, CASE_NUM, OWNER_ID, OWNER_ID_SUPPORT) VALUES(?,?,?,?)"
//     localdb.query(sqlInsert, [H_ID, CASE_NUM, OWNER_ID, OWNER_ID_SUPPORT], (err, result) => {
//         if(err) return console.log(err);
//         console.log(result);
//     });
// });

app.listen(3002, () => {
    console.log("Running on port 3002")
});
