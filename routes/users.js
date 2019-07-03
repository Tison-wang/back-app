var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/name', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.query));
    //res.send('respond with a name');
    res.send({user: 'tobi'});
});

module.exports = router;
