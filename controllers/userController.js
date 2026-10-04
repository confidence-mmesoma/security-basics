const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");

// GET /users
async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get users",
    });
  }
}

// GET /users/:id
async function getUser(req, res) {
  try {
    const id = Number(req.params.id);

    const user = await userModel.getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get user",
    });
  }
}

// POST /users
async function createUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password } = req.body;
    const user = await userModel.createUser(name, email, password);

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create user",
    });
  }
}

// PUT /users/:id
async function updateUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const user = await userModel.updateUser(id, name, email);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update user",
    });
  }
}

// DELETE /users/:id
async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);

    const user = await userModel.deleteUser(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
}




const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return next(new AppError('Invalid email or password', 401));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new AppError('Invalid email or password', 401));
    }

   const token = jwt.sign(
  { id: user.id, name: user.name, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

    res.json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
