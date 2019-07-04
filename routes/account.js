var express = require('express');
var router = express.Router();
var mysql = require("../src/dbconfig/mysql");

/* GET account request. */
router.get('/test', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.query));
    res.send({user: req.query.password + '-account'});
    mysql.query();
    mysql.connection.query('SELECT id,fullname,email from users', function (error, results, fields) {
        if (error) throw error;
        for (let item of results) {
            console.log('The account is: ', item.id, item.fullname, item.email);
        }
    });
});

module.exports = router;
