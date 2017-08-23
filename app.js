var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var consign = require('consign');

var app = express();

app.set('secret', 'homemavestruz');

//================= banco de dados mongodb ===================
var Mongoose = require('Mongoose');

var db = Mongoose.connection;

db.on('error', function(){
  console.log('Erro na conexão com o MongoDB.')
});

db.on('disconnected', function(){
  console.log('Desconectado do MongoDB.')
});
db.once('open', function() {
  console.log('Conectado ao MongoDB.')

});

process.on('SIGINT', function(){
  db.close(function(){
    console.log('Conexão com o MongoDB fechada pelo término da aplicação');
    process.exit(0);
  });
});

Mongoose.connect('mongodb://localhost/appRobo');
//===================== ===========================================



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'api')));
app.use(express.static(path.join(__dirname, 'routes')));

consign()
.include('models')
.then('api')
.then('routes')
.into(app);

app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
