const {Router} = require('express');
const Joi = require("joi");
const router = Router();

// Database Config
const db = require('../config/db');

// View Case API
// ===========
router.post('/case/view-cases-by-owner', (req, res) => {
    res.send('API for view Case by owner');
});

router.post('/case/view-cases-by-group', (req, res) => {
    res.send('API for view case by group');
});

router.post('/case/view-unassigned-case', (req, res) => {
    res.send('API for unassigned case');
});

// ============
// Case API
// ============

// testing DB connection
router.get('/case/getCase', (req, res) => {
    localDB.query('SELECT * FROM tbl_case', (dbErr, dbRes) => {
        if(dbErr) return console.log(dbErr);
        res.send(dbRes);
    })
})

router.post("/case/create-new-case", (req, res) => {
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

router.post('/case/update-case/:id', (req, res) => {
    res.send(`Update case API for ${req.params.id}`)
})


// ============

module.exports = router;