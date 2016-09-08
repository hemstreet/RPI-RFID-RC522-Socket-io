var Server = require('./lib/Server');
var argv = require('yargs').argv;

new Server({
    port: 8000,
    mock: argv.mock || null
})