const {Router} = require('express');
const Joi = require("joi");
const router = Router();

// Database Config
const db = require('../config/db');

// Chat =========================================================
router.post('/chat/push-message/', (req, res, next) => {
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

router.get('/chat/pull-message/:cToken', (req, res) => {
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

router.get('/chat/view-users-by-group/', (req, res) => {
    res.send('API for View User by Group');
})

module.exports = router;