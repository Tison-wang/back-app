var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.body));
    res.send({user: req.body.password + '-post'});
});

router.get('/name', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.query));
    res.send({user: req.query.password + '-tobi'});
});

module.exports = router;
