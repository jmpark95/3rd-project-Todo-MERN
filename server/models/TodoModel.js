const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
})

const TodoModel = mongoose.model("Todo", todoSchema)

module.exports = TodoModel