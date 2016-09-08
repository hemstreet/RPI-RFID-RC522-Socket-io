var Card = function(options) {
    this.socket = options.socket;
    this.config = options.config;
}

Card.prototype.willDetect = function() {
    console.log('Will detect card');
    this.socket.emit(this.config.events.didDetect);
}

Card.prototype.willRead = function(data) {
    console.log('Will read card', data);
    this.socket.emit(this.config.events.didRead, data);
}

Card.prototype.willSendAuthenticationError = function(data) {
    console.log('Will send authentication error', data);
    this.socket.emit(this.config.events.didSendAuthenticationError, data);
}

Card.prototype.willApprove = function(data) {
    console.log('Will approve card', data);
    this.socket.emit(this.config.events.didApprove, data);
}
module.exports = Card;