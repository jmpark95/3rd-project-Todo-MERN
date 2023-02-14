var express = require("express");
var router = express.Router();
const TodoModel = require("../models/TodoModel");

// GET All Todos
router.get("/", async function (req, res, next) {
  try {
    const allTodos = await TodoModel.find({});
    res.json(allTodos);
  } catch (err) {
    next(err);
  }
});

//Create todo POST
router.post("/", async function (req, res, next) {
  try {
    const newTodo = await TodoModel.create({
      name: req.body.name,
      completed: false,
    });
    res.json(newTodo);
  } catch (err) {
    next(err);
  }
});

//Delete todo
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const removedDocument = await TodoModel.findByIdAndRemove(id);
    res.json(removedDocument);
  } catch (err) {
    next(err);
  }
});

//Update todo
router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    // console.log(req.body)
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { name: req.body.name, completed: req.body.completed },
      { new: true }
    );
    // console.log(updatedTodo)
    res.json(updatedTodo);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
