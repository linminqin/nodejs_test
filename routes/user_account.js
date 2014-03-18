var userService = require('./service/user_account');
var dateformat = require('dateformat');
var logger = require('../log').logger;
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'APITest' });
};

exports.userAccountList = function(req, res){
    var data = {
        title: '用户账号',
        dateFormat: function(date) {
            return dateformat(date, "yyyy-mm-dd HH:MM:ss");
        }
    };
    userService.findAll(function(results) {
        data.users = results;
        res.render('userAccount', data);
    });
};