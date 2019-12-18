const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log4js = require("./src/logconfig/log4j.config");
const logger1 = log4js.getLogger('app');
const app = express();

/*修改服务端代码，进行全路由配置，允许跨域请求*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
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
    cookie: {
        maxAge: 180000
    },
    resave: false,
    saveUninitialized: true
}));

// request valid
app.use(function (req, res, next) {
    logger1.info("请求拦截: " + req.url);
    //解析用户请求路径
    var arr = req.url.split('/');
    //去除get请求携带的参数
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split('?')[0];
    }
    if (arr.length > 1) {
        if (arr[2] === 'account' && (arr[3] === 'login' || arr[3] === 'logout')) {
            next();
        } else {
            if (req.session.username) {
                logger1.info(req.session.username);
                //用户登录过
                next();
            } else {
                logger1.error('intercept：用户未登录执行登录拦截，路径为：' + req.url);
                //res.redirect('/#/');  // 将用户重定向到登录页面
                res.send({msg: 401});
            }
        }
    }
});

// route setup
const indexRouter = require('./routes/index');
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
