const express = require('express'),  
      app = express(),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      mongoose = require('mongoose'),
      config = require('./config/main');
const router = require('./router');
var path = require('path');
var configWebpack = require('./webpack.config.js');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var User = require('./models/user');

      // Database Connection
      
mongoose.connect(config.database); 


var compiler = webpack(configWebpack);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: configWebpack.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('./dist'));
app.use(express.static('./src'));

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
const automateJob = require('./controllers/automateJob');
automateJob.start();
const automateUpdate = require('./controllers/automateUpdate');
automateUpdate.start();
// Setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

// Enable CORS from client-side
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.static('./dist'));
router(app);  
app.use('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '/dist/index.html'));
});
      // Start the server
const server = app.listen(config.port);  
console.log('Your server is running on port ' + config.port + '.');  