// Logging events serve several important purposes

//  - Debugging and Troubleshooting
//  - Monitoring and Performance Optimization
//  - Auditing and Compliance
//  - Security
//  - Performance Analysis and Capacity Planning
//  - Business Intelligence and Analytics

const EventEmitter = require("node:events");
const eventsLog = require("./eventsLog");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("log", (message) => {
  eventsLog(message);
});

myEmitter.emit("log", "Log event emitted1");
