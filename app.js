if (process.env.ENV != 'production') {
  require('dotenv').config();
}

var express = require('express');
var cors = require('cors');
var swaggerJSDoc = require('swagger-jsdoc');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');


var options = {
  server: {
    auto_reconnect: true
  },
  reconnectTries: 50,
  reconnectInterval: 5000
};


var app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var swaggerDefinition = {
  info: {
    title: 'Ixchel Swagger API (Challenges Service)',
    version: '0.1',
    description: 'Challenges Microservice API Definition',
  },
  host: 'localhost:' + process.env.PORT,
  basePath: '/'
};

var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js']
};

var swaggerSpec = swaggerJSDoc(options);
app.set('swaggerSpec', swaggerSpec);
// serve swagger
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
// use teade
var teade = require('./server');

var routes = require('./routes/index');
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  res.status(404).send({
    success: false,
    message: "Error (Not found)",
    type: "Challenges Srv",
    action: req.method + ' ' + req.originalUrl,
    data: [],
    meta: {}
  });
});

app.use(function (err, req, res, next) {
  if (err && err.status == 520) {
    return next();
  }
  res.status(520).send({
    success: false,
    message: "somethingWentWrong",
    type: "Challenges Srv",
    action: 'uncaughtException'
  });
});


module.exports = app;
