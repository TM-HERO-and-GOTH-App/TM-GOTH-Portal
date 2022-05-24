const {Router} = require('express');
const Joi = require("joi");
const router = Router();

// Database Config
const db = require('../config/db');

// Dashboard API =============
router.post('/dashboard/total-case-by-state', (req, res) => {
    res.send('API for Total Case by State here.');
});

router.post('/dashboard/total-user-by-state', (req, res) => {
    res.send('API for Total User by State');
});

router.post('/dashboard/get-total-case-by-group', (req, res) => {
    res.send('API for Total Case for group');
});

router.post('/dashboard/get-total-case-by-owner', (req, res) => {
    res.send('API for Total Case by User');
});

router.post('/dashboard/get-total-case-by-stakeholder', (req, res) => {
    res.send('API for Total Case by Stakeholder');
});

router.get('/dashboard/get-total-case-resolved-by-owner', (req, res) => {
    res.send('API for Total Case resolved by Owner');
});

router.post('/dashboard/get-total-case-resolved-by-group', (req, res) => {
    res.send('API for Total Case resolved by Group');
});

// ============

module.exports = router;