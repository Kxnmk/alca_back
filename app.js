var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var usuarios = require('./routes/usuarios');
var roles = require('./routes/roles');
var actores = require('./routes/actores');
var mesas = require('./routes/mesas');
var audiencias = require('./routes/audiencias');
var demandas = require('./routes/demandas');
var comisiones = require('./routes/comisiones');
var demandados = require('./routes/demandados');
var statusR = require('./routes/statusRoles');
var status = require('./routes/statusv');
var statusDemanda = require('./routes/statusDemandas');
var proyectista = require('./routes/proyectistas');

var upload = require('./routes/uploads');
var documento = require('./routes/documentos');

const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};


var app = express();

// Cross
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

//rutas
app.use('/api/usuarios',usuarios);
app.use('/api/roles',roles);
app.use('/api/actores',actores);
app.use('/api/mesas',mesas);
app.use('/api/audiencias', audiencias);
app.use('/api/demandas', demandas);
app.use('/api/comisiones', comisiones);
app.use('/api/demandados', demandados);
app.use('/api/statusRol', statusR);
app.use('/api/status',status);
app.use('/api/statusD', statusDemanda);

app.use('/api/upload', upload);
app.use('/api/documentos', documento);
app.use('/api/proyectistas', proyectista);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
