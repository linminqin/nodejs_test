var mysql = require('mysql');
var logger = require('../../log').logger;

var db_options = {
    host: '192.168.1.211',
    user: 'root',
    password: '',
    port: 3308,
    database: 'queendb'
}

var db_pool = mysql.createPool(db_options);

/**
 * 释放数据库连接
 */
exports.release = function(connection) {
    connection.end(function(error) {
        logger.debug('Connection closed');
    });
};

/**
 * 执行查询
 */
exports.execQuery = function(options) {
    db_pool.getConnection(function(error, connection) {
        if(error) {
            logger.error('获取数据库连接异常！');
            throw error;
        }

        /*
         * connection.query('USE ' + config.db, function(error, results) { if(error) { log.error('DB-选择数据库异常！'); connection.end(); throw error; } });
         */
        // 查询参数
        var sql = options['sql'];
        var args = options['args'];
        var handler = options['handler'];

        // 执行查询
        if(!args) {
            var query = connection.query(sql, function(error, results) {
                if(error) {
                    logger.error('执行查询语句异常！');
                    throw error;
                }
                // 处理结果
                handler(results);
            });

            console.log(query.sql);
        } else {
            var query = connection.query(sql, args, function(error, results) {
                if(error) {
                    logger.error('执行查询语句异常！');
                    throw error;
                }
                // 处理结果
                handler(results);
            });
            logger.debug(query.sql);
        }

        // 返回连接池
        connection.release(function(error) {
            if(error) {
                logger.error('关闭数据库连接异常！');
                throw error;
            }
        });
    });
};