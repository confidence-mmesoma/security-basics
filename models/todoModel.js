const pool = require("../db");

async function getAllTodos() {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  return result.rows;
}

async function getTodoById(id) {
  const result = await pool.query(
    "SELECT * FROM todos WHERE id = $1",
    [id]
  );

  return result.rows[0];
}

async function createTodo(title, completed, userId) {
  const result = await pool.query(
    `INSERT INTO todos (title, completed, user_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, completed, userId]
  );

  return result.rows[0];
}

async function updateTodo(id, title, completed, userId) {
  const result = await pool.query(
    `UPDATE todos
     SET title = $1, completed = $2, user_id = $3
     WHERE id = $4
     RETURNING *`,
    [title, completed, userId, id]
  );

  return result.rows[0];
}

async function deleteTodo(id) {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
}

async function getTodosForUser(userId) {
  const result = await pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id",
    [userId]
  );

  return result.rows;
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosForUser
};