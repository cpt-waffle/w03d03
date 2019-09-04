const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const cookieSession = require('cookie-session');

const users = {
  1: { username: 'obiwan@gmail.com',  password: 'helloThere'},
  2: { username: 'gimli@gmail.com',   password: 'andMyAxe'},
  3: { username: 'a@gmail.com',       password:'test'},
};

app.set("view engine", "ejs");

app.use(cookieSession({
  name: 'user_id',
  keys: ['id']
}));

app.get("/", (req, res) => {
  const templateVars = { user: undefined };
  templateVars.user = req.session.user_id ? users[req.session.user_id] : undefined;
  res.render('index', templateVars );
});

app.post("/login", (req, res) => {

  for (let user in users) {
    console.log(users[user]);
    if (users[user].username === req.body.username) {
      if (users[user].password === req.body.password) {
        // res.cookie('user_id', user);
        req.session.user_id = user;
        break;
      }
    }
  }
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});






