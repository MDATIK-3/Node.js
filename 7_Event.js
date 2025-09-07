const EventEmitter = require('events');

// Create an emitter
const myEmitter = new EventEmitter();

// Register a listener
myEmitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit the event
myEmitter.emit('greet', 'Atik');
