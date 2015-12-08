module.exports = function Socket(http) {
    var io = require('socket.io').listen(http);
    var panel = io.of('/panel');
    var view = io.of('/view');

    view
        .on('connection', function(socket) {
            console.log('view connected');

            socket.on('load', function(data) {
                console.log('load', data);
            });
            socket.on('disconnect', function() {
                console.log('user disconnected');
            });
        });

    panel
        .on('connection', function(socket) {
            console.log('panel connected');

            socket.on('load', function(data) {
                console.log('panel load', data);
            });
            socket.on('event', function(data) {
                console.log('panel event', data);
            });
            socket.on('disconnect', function() {
                console.log('user disconnected');
            });
        });
};
