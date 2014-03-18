var db = require('../database/db_mysql');
var queen_table_user_account = 'qdb_user_account';

exports.findAll = function(handler, id) {
    db.execQuery({
        "sql": "SELECT * FROM " + queen_table_user_account,
        "args": [id],
        "handler": handler
    });
};