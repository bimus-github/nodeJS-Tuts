const express = require("express");
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const app = express();

const logEvents = require("./eventsLog");

const pathToHtml = path.join(__dirname, "main.html");
const pathToNames = path.join(__dirname, "names.json");

const PORT = process.env.prot || 3500;

app.use(express.json());

app.get("/", async (_, res) => {
  try {
    logEvents("User Appa Kirdi");
    res.sendFile(pathToHtml);
  } catch (error) {
    console.log(error);
  }
});

app.get("/names", async (_, res) => {
  try {
    logEvents("User barcha Isimlarni oldi");
    if (!fs.existsSync(pathToNames)) {
      res.status(200).json({ names: [] });
      return;
    }

    res.status(200).sendFile(pathToNames);
  } catch (error) {
    console.log(error);
  }
});

app.post("/names", async (req, res) => {
  try {
    const { name } = req.body;
    logEvents(`User ${name} ismini bazaga qo'shdi`);
    const names = [];
    if (fs.existsSync(pathToNames)) {
      const data = await fsPromises.readFile(pathToNames, "utf-8");

      names.push(...JSON.parse(data).names);
    }
    names.push(name);

    await fsPromises.writeFile(pathToNames, JSON.stringify({ names }));

    res.status(201).json({ name });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  logEvents(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
