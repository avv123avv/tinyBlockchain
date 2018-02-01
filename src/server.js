import express  from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import bCrypt from 'bcrypt-nodejs';
import cors from 'cors';

import UserRouter from './controllers/user';
import loginRequired from './middleware/loginRequired';

const userAdmin = {
  id:1,
  username: 'admin',
  // password: 'admin'
  password: '$2a$10$n/HTpSmq8AkVJq1dvVNhfOPNpDmZLsu6mHt7ts2DCC3RCZh1b46lS'
};

const app = express();
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, userAdmin);
});

const isValidPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

passport.use('login', new LocalStrategy((username, password, done) => {
  if (username !== userAdmin.username) {
    console.log('User Not Found with username ' + username);
    return done(null, false, 'User Not found.');
  }
  // User exists but wrong password, log the error
  if (!isValidPassword(userAdmin, password)) {
    console.log('Invalid Password');
    return done(null, false, 'Invalid Password');
  }
  // User and password both match, return user from
  // done method which will be treated like success
  return done(null, userAdmin);
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin:['http://localhost:3005'],
  methods:['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  else {
    next();
  }
});

app.post('/auth',
  passport.authenticate('login', {
    successRedirect: '/users',
  }));

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/users');
});
app.use('/', loginRequired, UserRouter);

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});
