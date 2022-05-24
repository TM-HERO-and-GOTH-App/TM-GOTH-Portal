const {Router} = require('express');
const Joi = require("joi");
const router = Router();

// Database Config
const db = require('../config/db');

router.post('/user/get-user-by-email', (req, res) => {
    res.send('Get User by its keyword')
});

router.post('/user/view-all-user', (req, res) => {
    res.send('View all user here.')
});

router.post('/user/update-user-profile', (req, res) => {
    res.send('Update user profile API.')
});

router.post('/user/get-user-profile-by-keyword', (req, res) => {
    res.send('User by keyword API.')
});

router.post('/user/set-as-admin', (req, res) => {
    res.send('Set user as Admin API.')
});

router.post('/user/set-as-vip', (req, res) => {
    res.send('Set User as VIP API.')
});

// Have to make sure this 2 API can only be set by admin
// ...........
router.post('/user/invite-to-stakeholder-group', (req, res) => {
    res.send('Invite user to stakeholder group.')
});

router.post('/user/remove-from-stakeholder-group', (req, res) => {
    res.send('User have been removed from stakeholder group API.')
});
// ...........

module.exports = router;