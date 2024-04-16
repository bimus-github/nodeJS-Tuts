const express = require("express");
const cors = require("cors");

const todoRouter = require("./routes/todo");

const app = express();

const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cors({}));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
