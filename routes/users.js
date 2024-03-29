const express = require('express');
const router = express.Router();
const log4js = require("../src/logconfig/log4j.config");
const logger = log4js.getLogger('users');

/* GET users listing. */
router.post('/', function (req, res, next) {
    logger.warn("请求：" + JSON.stringify(req.body));
    logger.info("session: " + req.session.username);
    res.send({user: req.body.password + '-post'});
});

router.get('/name', function (req, res, next) {
    logger.warn("请求：" + JSON.stringify(req.query));
    res.send({user: req.query.password + '-tobi'});
});

module.exports = router;
