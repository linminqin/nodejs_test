var userService = require('./service/user_account');
var dateformat = require('dateformat');
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'APITest' });
};