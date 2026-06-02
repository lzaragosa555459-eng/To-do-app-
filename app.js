const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const connectDB = require("./config/db");

// connect database
connectDB();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api/todos", todoRoutes);

// pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "admin@gmail.com" && password === "123456") {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  } else {
    res.redirect("/");
  }
});

// server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});