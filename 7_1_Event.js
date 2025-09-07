const http = require('http');
const EventEmitter = require('events');

// Create custom event emitter
const myEmitter = new EventEmitter();

// Listener for 'request' event
myEmitter.on('request', (url) => {
    console.log(`New request received at: ${url}`);
});

// Create HTTP server
const server = http.createServer((req, res) => {
    // Emit custom event
    myEmitter.emit('request', req.url);

    res.end('Request logged!');
});

// Start server
server.listen(5000, () => {
    console.log('Server running on http://localhost:5000 ');
});
