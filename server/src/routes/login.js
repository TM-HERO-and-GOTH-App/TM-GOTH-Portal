const {Router} = require('express');
const Joi = require("joi");
const router = Router();
// Database Config
const db = require('../config/db');
const ldap = require('ldapjs');

function LDAPAuth(username, password){
    const client = ldap.createClient({
      url: ['ldap://10.54.5.231:389', 'ldap://10.54.5.231:636']
    });
    
    client.on('error', (err) => {
      // handle connection error
      console.log(err)
    });
    
    client.bind(username, password, (err) => {
        if(err){
            console.log(err)
        }
        if(!err) return console.log("Success login");
    });
}

LDAPAuth('cn=GOTHldapadmin, ou=serviceAccount, o=Telekom', "Passw0rd");

// app.post('/ldap-login', (req, res) => {

// });



module.exports = router;