var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

// var bodyParser = require('body-parser');
// var errorHandler = require('errorhandler');

var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);

var staticViewOpts = {
    root: __dirname + '/../views/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

// all environments
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.use(serveStatic(path.join(__dirname, '/../public')));

// routing
app.get('/view', function(req, res) {
    res.sendFile('view.html', staticViewOpts);
});
app.get('/panel', function(req, res) {
    res.sendFile('panel.html', staticViewOpts);
});

// listen sockets
require('./socket')(http);

// run server
http.listen(PORT, function(){
    console.log('Express server listening on port ' + PORT);
});
