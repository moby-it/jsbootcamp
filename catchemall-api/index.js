

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt'
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import { pokedexRouter } from './pokemon.js';
import initialize from './passport-config.js';
const app = express();
const port = 4000;
const users=[]

const initializePassport = initialize

initializePassport(passport,
  email=> users.find(user=> user.email === email),
  id=>users.find(user=> user.id=== id)
  )


app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())



// routes
app.get('/',checkAuthenticated, (req, res) => {
  res.send('Hello World!');
});
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }) 
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})


app.use("/pokemon", pokedexRouter);



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});