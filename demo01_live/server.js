const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//requie it !!
const cookieSession = require('cookie-session');

const users = [
	{ id: 0, username:'50cent', password: bcrypt('bankrupt')},
	{ id: 1,  username: 'postmalone', password: 'budlight'},
	{ id: 2,  username: 'harambe', password: 'rip'}
];

app.use(cookieSession({
  name: 'user_id',
  keys: ['id']
}));


app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req,res) => {
	console.log("does it actually work?!?!?!?!");
	console.log(req.query);
	let templateVars = { user: users[req.session.user_id]};
	res.render('index', templateVars);
})

app.post('/login', (req,res) => {
	console.log("AND NOW WE ARE POSTING!!!!!!!");
	console.log(req.body);
	let userFound = undefined;
	for (let user of users) {
		console.log(user);
		if (user.username === req.body.username) {
			if (user.password === req.body.password) {
				userFound = user;
			}
		}

	}

	if (userFound) {
		//res.cookie('user',userFound.id);
		req.session.user_id = userFound.id;
		res.redirect(`/`);
	} else {
		res.redirect('/');
	}
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});



