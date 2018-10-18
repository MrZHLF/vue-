const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const session = require('express-session');

const app = express();

/* app.use(
  session({
    secret: "123456",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  })
); */

app.use(session({
    secret :  '12345', // 对session id 相关的cookie 进行签名
    cookie : {maxAge : 1000 * 60 * 60 * 24}, // 设置 session 的有效时间，单位毫秒},
    resave : false,
    saveUninitialized: true, // 是否保存未初始化的会话
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//解决跨域问题
app.all("*",function(req,res,next) {
	if (!req.get("Origin")) return next();
	res.set("Access-Control-Allow-Origin","*");
	res.set("Access-Control-Allow-Methods","GET");
	res.set("Access-Control-Allow-Headers","X-Requested-With","Content-Type");
	
	next()
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
