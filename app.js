let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const bodyParser = require('body-parser');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let recipeRouter = require('./routes/recipe');
const methodOverride = require('method-override');

let app = express();
let mongoose = require('mongoose');
console.log('Mongoose version : ' + mongoose.version);

// Connexion à mongo
mongoose.connect('mongodb://localhost/catalogue', {useNewUrlParser:true})
    .then(
        () => console.log('Connexion a mongo reussie !'),
        (err) => {
          throw new Error(err.message)
        }
    );


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method
    }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recettes', recipeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Gestion des erreurs (generique)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
