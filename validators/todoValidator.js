const { body } = require("express-validator");

const validateTodo = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),
];

module.exports = validateTodo;