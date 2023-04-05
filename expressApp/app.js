var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

// const { MongoClient } = require("mongodb");
// const uri = `${process.env.MONGODB_URI}`;
// const client = new MongoClient(uri);

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
  console.log('MongoDB connected!');
});

app.locals.database = database;
app.use('/', indexRouter);
app.use('/users', usersRouter);

// async function run() {
//   try {
//     const database = client.db('test');
//     console.log('Connected to MongoDB server');
//     app.locals.database = database;
//     app.use('/', indexRouter);
//     app.use('/users', usersRouter);
//     app.use('/login', loginRouter);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }
// run().catch(console.dir);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
