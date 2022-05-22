const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Joi = require('joi');
const path = require('path');

// SWITCH BETWEEN LOCAL AND DEV DB
const db = require('./db').localPool;
// const db = require('./db').pool;

const app = express();
app.use(express.static(path.resolve(__dirname, '../client/public', 'index.html')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

// Test port if request received
app.get('/', (req, res, next) => {
    res.status(200).send("Status Working");
    next();
})

app.post('/chat/push-message/', (req, res, next) => {
    const schema = Joi.object({
        C_ID: Joi.string().required,
        MESSAGE: Joi.string().min(1).max(300).required,
        SOURCE: Joi.string().valid('GOTH', 'UNIFIBUDDY').required,
        HB_ID: Joi.string().required,
        G_ID: Joi.string().required,
        PICTURE: Joi.any()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return
    }

    db.getConnection((err, conn) => {
        if (err) throw err; // not connected
        conn.query("insert into tbl_chat(C_ID, MESSAGE, SOURCE, HB_ID, G_ID, PICTURE) values (?,?,?,?,?,?)",
            [req.body.C_ID, req.body.MESSAGE, req.body.SOURCE, req.body.HB_ID, req.body.G_ID, req.body.PICTURE],
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

// PORT
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on ${port}...`));
