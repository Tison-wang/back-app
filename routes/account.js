var express = require('express');
var router = express.Router();
const mysqlPool = require("../src/dbconfig/mysql");
var log4js = require("../src/logconfig/log4j.config");
var logger = log4js.getLogger('account');

/* GET account request. */
router.get('/login', function (req, res, next) {

    logger.warn("请求：" + JSON.stringify(req.query));
    try {
        req.session.username = req.query.password;
    } catch (e) {
        throw e;
    }
    res.send({user: "login success！"});
    /*mysqlPool.query("update users set email = ''" + req.query.password + " where fullname='tiansheng.wang'", function (error, results, fields) {
        logger.info(results);
        for (let item of results) {
            console.log('dd The account is: ', item.id, item.fullname, item.email);
        }
    });*/

    mysqlPool.getConnection((err, conn) => {
        conn.query('SELECT id,fullname,email from users', function (error, results, fields) {
            if (error) throw error;
            for (let item of results) {
                logger.info('The account is: ', item.id, item.fullname, item.email);
            }
        });
        mysqlPool.releaseConnection(conn);
    });

});

router.post('/test', function (req, res, next) {
    logger.warn("session：" + req.session.username);
});

module.exports = router;
