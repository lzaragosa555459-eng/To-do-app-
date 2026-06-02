const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/Home", (req, res) => {
  res.send(`
    <h1>Simple Docker App</h1>

    <form method="POST" action="/submit">
      <input type="text" name="username" placeholder="Enter your name" />
      <button type="submit">Send</button>
    </form>
  `);
});

app.post("/submit", (req, res) => {
  const name = req.body.username;

  res.send(`
    <h1>Hello ${name}!</h1>
    <a href="/">Go Back</a>
  `);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
