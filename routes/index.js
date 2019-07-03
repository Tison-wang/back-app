var express = require('express');
var usersRouter = require('./users');
var accountRouter = require('./account');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

// 路由嵌套
router.use('/users', usersRouter);
router.use('/account', accountRouter);

module.exports = router;
