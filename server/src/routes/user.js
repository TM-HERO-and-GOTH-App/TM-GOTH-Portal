const express = require('express');
const Joi = require("joi");
const router = express.Router();

// Database Config
const db = require('../config/db');

router.post('/get-user-by-email', (req, res) => {
    res.send('Get User by its keyword')
});

router.post('/view-all-user', (req, res) => {
    res.send('View all user here.')
});

router.post('/update-user-profile', (req, res) => {
    res.send('Update user profile API.')
});

router.post('/get-user-profile-by-keyword', (req, res) => {
    res.send('User by keyword API.')
});

router.post('/set-as-admin', (req, res) => {
    res.send('Set user as Admin API.')
});

router.post('/set-as-vip', (req, res) => {
    res.send('Set User as VIP API.')
});

// Have to make sure this 2 API can only be set by admin
// ...........
router.post('/invite-to-stakeholder-group', (req, res) => {
    res.send('Invite user to stakeholder group.')
});

router.post('/remove-from-stakeholder-group', (req, res) => {
    res.send('User have been removed from stakeholder group API.')
});
// ...........

module.exports = router;