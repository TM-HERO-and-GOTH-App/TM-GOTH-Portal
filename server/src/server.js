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
    host: process.env.DB_HOST,
    port: 3308,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/', (req, res) => {
    res.send('Hello from Server')
});

// Dashboard API =============

app.post('/dashboard/total-case-by-state', (req, res) => {
    res.send('API for Total Case by State here.');
});

app.post('/dashboard/total-user-by-state', (req, res) => {
    res.send('API for Total User by State');
});

app.post('/dashboard/get-total-case-by-group', (req, res) => {
    res.send('API for Total Case for group');
});

app.post('/dashboard/get-total-case-by-owner', (req, res) => {
    res.send('API for Total Case by User');
});

app.post('/dashboard/get-total-case-by-stakeholder', (req, res) => {
    res.send('API for Total Case by Stakeholder');
});

app.post('/dashboard/get-total-case-resolved-by-owner', (req, res) => {
    res.send('API for Total Case resolved by Owner');
});

app.post('/dashboard/get-total-case-resolved-by-group', (req, res) => {
    res.send('API for Total Case resolved by Group');
});

// ============

// View Case API
// ===========

app.post('/case/view-cases-by-owner', (req, res) => {
    res.send('API for view Case by owner');
});

app.post('/case/view-cases-by-group', (req, res) => {
    res.send('API for view case by group');
});

app.post('/case/view-unassigned-case', (req, res) => {
    res.send('API for unassign case');
});

// ============

// Case API
// ============

// testing DB connection
app.get('/case/getCase', (req, res) => {
    localDB.query('SELECT * FROM tbl_case', (dbError, dbResult) => {
        if(dbError) return res.send(dbError);
        res.send(dbResult);
    })
})

app.post("/case/create-new-case", (req, res) => {
    const schema = Joi.object({
        authToken: Joi.string().min(32).max(40).required(),
        customerName: Joi.string().required(),
        nric: Joi.number().required(),
        loggerMobileNumber: Joi.number().required(),
        stateID: Joi.number().required(),
        externalSystemReference: Joi.number().required(),
        stakeholderReferenceID: Joi.number().required(),
        sourceID: Joi.number().required(),
        caseDescription: Joi.string().required(),
        symptomID: Joi.number().required(),
        areaID: Joi.number().required(),
        subAreaID: Joi.number().required(),
        productID: Joi.number().required(),
        attachment: Joi.any(),
        customerMobileNumber: Joi.number()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.sendStatus(400).send(result.error.details[0].message);
        return;
    }

    res.send('API for create case');
});

// ============


app.listen(3002, () => {
    console.log("Running on port 3002")
});
