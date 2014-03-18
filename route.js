
/**
 * Module dependencies.
 */


var routes = require('./routes');
var userAccount = require('./routes/user_account');

module.exports = function(app) {
    app.get('/', routes.index);
    app.get('/userAccounts', userAccount.userAccountList);
}