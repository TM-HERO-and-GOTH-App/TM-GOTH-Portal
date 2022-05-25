const {Router} = require('express');
const Joi = require("joi");
const router = Router();

// Database Config
const db = require('../config/db');

router.post('/announcement/get-all-announcement', (req, res) =>{
    res.send('Get All Announcement API.')
})

router.post('/announcement/send-announcement', (req, res) =>{
    res.send('Send Announcement API.')
})

router.post('/announcement/update-announcement/:id', (req, res) =>{
    res.send(`Edit announcement based on ID and the ID is ${req.params.id}`);
})


module.exports = router;