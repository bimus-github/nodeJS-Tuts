// const os = require("os");
// const path = require("path");

// // console.log(os.type());
// // console.log(os.version());
// // console.log(os.homedir());
// // console.log(os.hostname());

// // console.log(__filename);

// // console.log(path.dirname(__filename));
// // console.log(path.basename(__filename));
// // console.log(path.parse(__filename));

// console.log(path.join(__dirname, "app", "server.js"));

const { add, sub } = require("./app/server.js");

console.log(add(1, 2));
console.log(sub(1, 2));
