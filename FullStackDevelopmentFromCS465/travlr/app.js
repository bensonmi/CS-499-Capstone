require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// //Bring in the database
require('./app_api/models/db');

var indexRouter = require("./app_server/routes/index.js");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");
var roomsRouter = require("./app_server/routes/rooms");
var mealsRouter = require("./app_server/routes/meals");
var newsRouter = require("./app_server/routes/news");
var aboutRouter = require('./app_server/routes/about.js');
var contactRouter = require('./app_server/routes/contact.js');

var apiRouter = require("./app_api/routes/index.js");
//var apiRouter = require('./app_server/routes/about.js');

var handlebars = require("hbs");
const passport = require('passport');
require('./app_api/config/passport.js')

var app = express();

//----------------------- button on contact page -------------------------------------------
// Import necessary modules
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
console.log('here 1');

// Route to handle form submission
app.post('/submit', (req, res) => {
  // Render the "Under Construction" page
  res.render('under_construction');
  // Process the form data here
  //const name = req.body.name;
  //const email = req.body.email;
  //const subject = req.body.subject;
  //const message = req.body.message;

  // You can then do something with the form data, like saving it to a database
  // Example:
  // saveFormDataToDatabase(name, email, subject, message);

  // Respond to the client, for example, you could redirect them to another page
  // res.redirect('/thank-you'); // Redirect to a "thank you" page
});


//--^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
console.log('here 2');
// allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


console.log('here 3');

// catch unauthorized error and create 401
console.log('here 4');
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});
// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
console.log('here 5');
// register handlbars parials 
handlebars.registerPartials(__dirname + "/app_server/views/partials");

app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
// Allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin','http://localhost:4200');
  res.header('Access-Control-Allow-Headers','Origin,X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  next();
});
console.log('here 6');



app.use('/', indexRouter);
// app.use('/index', indexRouter);
app.use('/index', function(req, res, next) {
  res.redirect('/');
});
// catch 404 and forward to error handler

app.use('/users', usersRouter);
app.use("/travel", travelRouter);
app.use("/rooms", roomsRouter);
app.use("/meals", mealsRouter);
app.use("/news", newsRouter);
app.use('/about', aboutRouter);
app.use('/contact',contactRouter);

console.log('here 7');

app.use('/api', apiRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.use(function(req, res, next) {
//   console.log('hello1');
//    next(createError(404));
// });
console.log('here 8');
module.exports = app;
