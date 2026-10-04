const { validationResult } = require("express-validator");
const todoModel = require("../models/todoModel");

// GET /todos
async function getTodos(req, res) {
  try {
    const todos = await todoModel.getAllTodos();

    res.json(todos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get todos",
    });
  }
}

// GET /todos/:id
async function getTodo(req, res) {
  try {
    const id = Number(req.params.id);

    const todo = await todoModel.getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get todo",
    });
  }
}

// POST /todos
async function createTodo(req, res) {

    const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array(),
  });
}

  try {
    const { title, completed, user_id } = req.body;

    const todo = await todoModel.createTodo(
      title,
      completed ?? false,
      user_id
    );

    res.status(201).json(todo);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create todo",
    });
  }
}

// PUT /todos/:id
async function updateTodo(req, res) {
    const errors = validationResult(req);

if (!errors.isEmpty()) {
  return res.status(400).json({
    errors: errors.array(),
  });
}

  try {
    const id = Number(req.params.id);
    const { title, completed, user_id } = req.body;

    const todo = await todoModel.updateTodo(
      id,
      title,
      completed,
      user_id
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update todo",
    });
  }
}

// DELETE /todos/:id
async function deleteTodo(req, res) {
  try {
    const id = Number(req.params.id);

    const todo = await todoModel.deleteTodo(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
      todo,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete todo",
    });
  }
}

// GET /users/:id/todos
async function getUserTodos(req, res) {
  try {
    const userId = Number(req.params.id);

    const todos = await todoModel.getTodosForUser(userId);

    res.json(todos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get user's todos",
    });
  }
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getUserTodos,
};