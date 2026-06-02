const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if(email == 'admin@gmail.com' && password == '123456'){
    res.send(`
      <h1>Hello ${email}!</h1>
      <a href="/">Go Back</a>
    `);
  } else {
    res.redirect('/');
  }


});





app.listen(3000, () => {
  console.log("Server running on port 3000");
});

