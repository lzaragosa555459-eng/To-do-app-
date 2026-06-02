const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Todo = require("./models/Todo");

require("dotenv").config();

// Connect to MongoDB - REMOVE the deprecated options
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/todo-app';
console.log('Connecting to MongoDB at:', mongoURI);

// SIMPLE CONNECTION - NO deprecated options
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


console.log('=== AFTER IMPORT ===');
console.log('Todo imported as:', Todo);
console.log('Todo.find type:', typeof Todo.find);
console.log('===================');

// routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/home", async (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt for:', email);
  
  // DEBUG: Check what Todo is RIGHT BEFORE using it
  console.log('=== DEBUG TODO OBJECT ===');
  console.log('Todo value:', Todo);
  console.log('Type of Todo:', typeof Todo);
  console.log('Is Todo null?', Todo === null);
  console.log('Is Todo undefined?', Todo === undefined);
  console.log('Todo.find:', Todo?.find);
  console.log('Todo keys:', Object.keys(Todo || {}));
  console.log('========================');

  if (email === "admin@gmail.com" && password === "123456") {
    try {
      const todos = await Todo.find();
      console.log('✅ Todos found:', todos.length);
      return res.render("index", { todos });
    } catch (error) {
      console.error('Error finding todos:', error);
      return res.status(500).send(`Error: ${error.message}`);
    }
  }

  res.redirect("/");
});
// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});