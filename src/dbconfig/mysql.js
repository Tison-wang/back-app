var dbConfig = require("./db.config");
const mysql = require('mysql');

/**
 * 数据库连接池配置
 */
class MysqlPool {

    constructor() {
        this.flag = true;
        this.pool = mysql.createPool(dbConfig);
    }

    getPool() {
        if (this.flag) {
            this.pool.on('connection', (connection) => {
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }

}

module.exports = new MysqlPool().getPool();

