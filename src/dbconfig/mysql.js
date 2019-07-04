var dbConfig = require("./db.config");

class Connect {

    static getInstance() {
        if (!Connect.instance) {
            Connect.instance = new Connect();
        }
        return Connect.instance;
    }

    constructor() {
        console.log("实例化mysql信息");
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection(dbConfig);
        this.connection.connect();
    }

    query() {
        this.connection.query('select 1+1 as res from dual;', function (error, results, fields) {
            if (error) throw error;
            console.log("query success!");
            console.log('The result is: ', results[0].res);
        });
    }
}

module.exports = Connect.getInstance();