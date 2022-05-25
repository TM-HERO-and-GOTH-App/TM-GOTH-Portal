require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require("./routes");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Test Case for Connectivity during DEV
app.get('/', (req, res) => {
    res.status(200).send('Successfully connect to Server !!!')
});

app.use("/chat", routes.chat);
app.use("/case", routes.cases);
app.use("/dashboard", routes.dashboard);
app.use("/user", routes.user);
// app.use('/login', routes.)

// Port
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on ${port}...`));
