var express = require('express');
var router = express.Router();
const mysqlPool = require("../src/dbconfig/mysql");

/* GET account request. */
router.get('/test', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.query));
    res.send({user: req.query.password + '-account'});
    mysqlPool.query("update users set email = 'admin@rap2.com'" + req.query.password + " where fullname='admin'", function (error, results, fields) {
        /*if (error) throw error;
        for (let item of results) {
            console.log('The account is: ', item.id, item.fullname, item.email);
        }*/
    });
    mysqlPool.getConnection((err, conn) => {
        conn.query('SELECT id,fullname,email from users', function (error, results, fields) {
            if (error) throw error;
            for (let item of results) {
                console.log('The account is: ', item.id, item.fullname, item.email);
            }
        });
        mysqlPool.releaseConnection(conn);
    });
});

module.exports = router;
