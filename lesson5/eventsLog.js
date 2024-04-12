const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const generateId = () => Math.random().toString(36).substring(2);
const formatDate = () =>
  new Date().toLocaleString("ru-RU", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const eventsLog = async (message) => {
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      fs.mkdirSync(path.join(__dirname, "logs"));
    }
    const text = `${generateId()} - ${formatDate()} - ${message}\n`;
    fsPromises.appendFile(path.join(__dirname, "logs", "events.txt"), text);
  } catch (error) {
    console.log(error);
  }
};

module.exports = eventsLog;
