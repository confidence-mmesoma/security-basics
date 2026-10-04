const validateTodo = require("../validators/todoValidator");

const express = require("express");

const router = express.Router();

const todoController = require("../controllers/todoController");
const protect = require('../middleware/authMiddleware');

const restrictTo = require('../middleware/restrictTo');

// GET /todos/:id
router.get("/:id", todoController.getTodo);

// POST /todos
router.post("/", validateTodo, todoController.createTodo);

// PUT /todos/:id
router.put("/:id", validateTodo, todoController.updateTodo);

// PROTECTED ROUTE: GET /todos (requires authentication)
router.get('/', protect, todoController.getTodos);

router.delete('/:id', protect, restrictTo('admin'), todoController.deleteTodo);


module.exports = router;