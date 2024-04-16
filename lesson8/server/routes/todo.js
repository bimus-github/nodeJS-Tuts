const express = require("express");
const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const pathToToDosDir = path.join(__dirname, "..", "data");

const router = express.Router();

router
  .route("/")
  .get((_, res) => {
    res.status(200).sendFile(path.join(pathToToDosDir, "todos.json"));
  })
  .post(async (req, res) => {
    try {
      const { todo } = req.body;
      if (!fs.existsSync(pathToToDosDir)) {
        await fsPromises.mkdir(pathToToDosDir);
      }

      let existingToDos = await fsPromises
        .readFile(path.join(pathToToDosDir, "todos.json"))
        .then((data) => JSON.parse(data))
        .catch(() => ({
          todos: [],
        }));

      if (!!existingToDos) {
        existingToDos.todos.push(todo);
      } else {
        existingToDos.todos = [todo];
      }
      console.log(existingToDos);

      await fsPromises.writeFile(
        path.join(pathToToDosDir, "todos.json"),
        JSON.stringify(existingToDos)
      );

      res
        .status(200)
        .json({ success: true, message: "Todo added successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const { todo } = req.body;

      if (!fs.existsSync(pathToToDosDir)) {
        await fsPromises.mkdir(pathToToDosDir);
      }

      let existingToDos = await fsPromises
        .readFile(path.join(pathToToDosDir, "todos.json"))
        .then((data) => JSON.parse(data))
        .catch(() => ({
          todos: [],
        }));

      existingToDos.todos = existingToDos.todos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
      await fsPromises.writeFile(
        path.join(pathToToDosDir, "todos.json"),
        JSON.stringify(existingToDos)
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });

router.route("/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    if (!fs.existsSync(pathToToDosDir)) {
      await fsPromises.mkdir(pathToToDosDir);
    }

    let existingToDos = await fsPromises
      .readFile(path.join(pathToToDosDir, "todos.json"))
      .then((data) => JSON.parse(data))
      .catch(() => ({
        todos: [],
      }));

    existingToDos.todos = existingToDos.todos.filter((t) => t.id !== id);

    await fsPromises.writeFile(
      path.join(pathToToDosDir, "todos.json"),
      JSON.stringify(existingToDos)
    );

    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});
module.exports = router;
