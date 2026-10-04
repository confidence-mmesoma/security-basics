const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ message: err.message || 'Something went wrong on the server' });
});