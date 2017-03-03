var express = require('express'),
  io = require('socket.io'),
  http = require('http'),
  app = express(),
  server = http.createServer(app),
  io = io.listen(server)
  server.listen(3000);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./routes/api');
var person = require('./routes/personality');
var socket = require('./routes/socket');
io.sockets.on('connection', socket)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api);
app.use('/personality', person);
app.use('/socket', socket);

app.all('*', (req,res,next) => {
  res.sendFile('index.html', { root: __dirname + '/public/'});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


//for heroku deployment
const port = process.env.PORT || 8000;
app.listen(port, () => {
console.log('Listening on port', port);
});


module.exports = app;
