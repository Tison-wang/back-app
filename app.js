var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var log4js = require("./src/logconfig/log4j.config");
var logger1 = log4js.getLogger('app');
var app = express();

/*修改服务端代码，进行全路由配置，允许跨域请求*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=UTF-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('sessionTest'));
app.use(session({
    secret: 'sessionTest',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    }
}));

/*app.get('/back/login', function (req, res, next) {
    console.log("app-params: " + req.query.password);
    req.session.name = req.query.password;
    console.log("session：" + JSON.stringify(req.session));
    res.send({user: "login success！"});
    res.end();
});*/

// route setup
var indexRouter = require('./routes/index');
app.use('/back', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    logger1.error(req.url + ", 404");
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    logger1.error("error handler");
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// port setup
app.port = 5000;

module.exports = app;
