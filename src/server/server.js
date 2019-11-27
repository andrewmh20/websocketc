import express from 'express';
import path from 'path';
import ejs from 'ejs';
import apiRoutes from './routes/api'
import authRoutes from './routes/auth'

import passport from 'passport';
import googleAuth from 'passport-google-oauth20';
import {CLIENT_ID, CLIENT_SECRET} from './keys/google';
import expressSession from 'express-session'

import mongoose from 'mongoose';
import Api from './db/api/api'
import User from './db/models/user'

//TODO: What in package file should be a dev Dependency
//TODO: What exactly needs to be compiled/done differently in production from dev

const server = express();

// Use the EJS rendering engine for HTML located in /views
server.set('views', __dirname + '/../../public/views')
server.engine('html', ejs.__express)
server.set('view engine', 'html')

// Host static files on URL path
server.use(express.static(path.join(__dirname, '../../public/')))


server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//TODO: Change this URL
//Need to use this as a promise? i.e. check fo rconnection error.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/websocketc', 
  { useNewUrlParser: true, useUnifiedTopology: true });


server.use(expressSession({ secret: 'TEST', maxAge:null })); //session secret

server.use(passport.initialize());
server.use(passport.session());



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  User.findById(user, function (err, user) {
    done(err, user);
  });
});


passport.use(new googleAuth.Strategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: 'http://websocketc.com:3000/auth/google/callback'
},
async function(accessToken, refreshToken, profile, done) {
  try {
    const user = await Api.getOrCreateUser(profile.id, profile.name.givenName);
    done(null,user);
  } catch (err) {
    done(err);
  } 
}
));

server.use('/api', apiRoutes);
server.use('/auth', authRoutes)


server.get('/', (req, res) => {
  res.render('App')
})

// server.get('/App', (req, res) => {
//   console.log(req.user);
//   res.render('App');
// })




server.get('*', (_,res) =>{
  res.render('App');
});

//TODO Error handling

server.listen(process.env.PORT || 3000, () => {
  console.log('server listening on port ' + (process.env.PORT || 3000))
})
