const express = require('express');
const router = express.Router();
const mysqlPool = require("../src/dbconfig/mysql");
const log4js = require("../src/logconfig/log4j.config");
const logger = log4js.getLogger('account');

/* GET account request. */
router.get('/login', function (req, res, next) {

    logger.warn("请求：" + JSON.stringify(req.query));
    try {
        logger.warn(req.query.password);
        req.session.username = req.query.password;
        logger.warn(req.session.username);
    } catch (e) {
        throw e;
    }
    res.send({msg: "OK"});
    /*mysqlPool.query("update users set email = ''" + req.query.password + " where fullname='tiansheng.wang'", function (error, results, fields) {
        logger.info(results);
        for (let item of results) {
            console.log('dd The account is: ', item.id, item.fullname, item.email);
        }
    });*/

    /*mysqlPool.getConnection((err, conn) => {
        conn.query('SELECT id,fullname,email from Users', function (error, results, fields) {
            if (error) throw error;
            for (let item of results) {
                logger.info('The account is: ', item.id, item.fullname, item.email);
            }
        });
        mysqlPool.releaseConnection(conn);
    });*/

});

router.post('/logout', function (req, res, next) {
    logger.warn("session：" + req.session.username);
    req.session.destroy();
    res.send({msg: 401});
});

module.exports = router;
