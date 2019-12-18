const express = require('express');
const usersRouter = require('./users');
const accountRouter = require('./account');
const log4js = require("../src/logconfig/log4j.config");
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// 路由嵌套
router.use('/users', usersRouter);
router.use('/account', accountRouter);

module.exports = router;
