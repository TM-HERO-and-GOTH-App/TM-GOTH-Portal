const chat = require('./chat');
const user = require('./user');
const dashboard = require('./dashboard');
const cases = require('./case');

// Handle all the routing
module.exports = {
    chat,
    user,
    cases,
    dashboard,
};