var express = require('express');
var router = express.Router();

/* GET account request. */
router.get('/test', function (req, res, next) {
    console.log("请求：" + JSON.stringify(req.query));
    res.send({user: req.query.password + '-account'});
});

module.exports = router;
