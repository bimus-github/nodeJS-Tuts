const http = require("http");
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const logEvents = require("./eventsLog");

const pathToHtml = path.join(__dirname, "main.html");
const pathToNames = path.join(__dirname, "names.json");

const PORT = process.env.prot || 3500;

const server = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    logEvents("User Appa Kirdi");
    const html = await fsPromises.readFile(pathToHtml, "utf8");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  }

  if (req.url === "/names" && req.method === "GET") {
    logEvents("User barcha Isimlarni oldi");
    if (!fs.existsSync(pathToNames)) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify([]));
      return;
    }

    const names = await fsPromises.readFile(pathToNames, "utf8");

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(names);
    return;
  }

  if (req.url === "/names" && req.method === "POST") {
    let body = [];
    req
      .on("data", (chunk) => body.push(chunk))
      .on("end", async () => {
        body = Buffer.concat(body).toString();

        const { name } = JSON.parse(body);
        logEvents(`User ${name} ismini bazaga qo'shdi`);
        const names = [];
        if (fs.existsSync(pathToNames)) {
          const data = await fsPromises.readFile(pathToNames, "utf-8");

          names.push(...JSON.parse(data).names);
        }
        names.push(name);

        await fsPromises.writeFile(pathToNames, JSON.stringify({ names }));

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ name }));
      });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  console.log(`http://localhost:${PORT}`);
});
