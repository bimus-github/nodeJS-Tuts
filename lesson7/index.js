const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("./public"));
app.use(express.urlencoded());

const PORT = process.env.PORT || 3500;

app.get("/", (req, res) => {
  res.sendFile("./public/html/index.html", { root: __dirname });
});

app.post("/add", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
