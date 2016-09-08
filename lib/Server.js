var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var config = require('../config/config');
var extend = require('util')._extend;
var Card = require('./Card');

var Server = function(_config) {
    this.config = extend(config, _config);
    this.initializeSocket();
    this.initialzeRoutes();
}
Server.prototype.initialzeRoutes = function() {
    app.get('/', function(req, res){
        res.sendfile('./views/index.html');
    });

    http.listen(this.config.port, function(){
        console.log('listening on *:' + this.config.port);
    }.bind(this));
}

Server.prototype.initializeSocket = function() {
    io.on('connection', function(socket){
        console.log('User Connected');

        var card = new Card({
            config: this.config,
            socket: socket
        });

        // Detected card but we have no data yet
        socket.on(config.events.willDetect, function() {
            console.log("Will detect");
            card.willDetect();
        });
        socket.on(config.events.willRead, function(data) {
            console.log("Will Read");
            card.willRead(data);
        });
        socket.on(config.events.willSendAuthenticationError, function(data) {
            console.log("Will Send Auth");
            card.willSendAuthenticationError(data);
        });
        socket.on(config.events.willApprove, function(data) {
            console.log("Will Approve");
            card.willApprove(data);
        });

    }.bind(this));
}

module.exports = Server;
