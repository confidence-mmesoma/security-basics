const validateUser = require("../validators/userValidator");
const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const todoController = require("../controllers/todoController");

const loginLimiter = require('../middleware/rateLimiter');

// GET /users
router.get("/", userController.getUsers);

// GET /users/:id
router.get("/:id", userController.getUser);

// GET /users/:id/todos
router.get("/:id/todos", todoController.getUserTodos);

// POST /users
router.post("/", validateUser, userController.createUser);

// PUT /users/:id
router.put("/:id", validateUser, userController.updateUser);

// DELETE /users/:id
router.delete("/:id", userController.deleteUser);

// POST /users/login
router.post('/login', loginLimiter, userController.loginUser);

module.exports = router;