import express from 'express';
import path from 'path';
import ejs from 'ejs';
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

//TODO: Change this URL?
//Need to use this as a promise? i.e. check fo rconnection error.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/websocketc', 
  { useNewUrlParser: true, useUnifiedTopology: true });


//Route Needed:
//login
//list
//terminal
//API routes
//select WS (redirect to terminal)


let userData = [];
// userData = ([{user: profile.name.givenName,
//   wsData: [{name: 'Test', url: 'ws://localhost:8080'}, {name: 'Test', url: 'localhost'}]}])


// const sess = {
//   secret: 'thirty street',
//   cookie: {}
// }

server.use(expressSession({ secret: 'TEST', maxAge:null })); //session secret

// server.use(expressSession(sess));    


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

//TODO add express-session to actually store state

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

server.get('/auth/google/login',
  passport.authenticate('google', {
    scope: ['profile']
  }
  ));

server.get('/auth/login', (req,res)=>{
  res.redirect('/auth/google/login');

});

server.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


//Handle errors
server.get('/auth/google/callback', 
//TODO: redirect to "login failed page"
  passport.authenticate('google', {failureRedirect: '/' , successRedirect: '/App'})
  // (req, res) => {
  //   // Successful authentication, redirect home.
  //  res.redirect('/App');
  // }
);
  
// //{ failureRedirect: '/' }),
// 



// const userData = 
// [{user: 'Andrew', wsData: [{name: 'Test', url: 'ws://localhost:8080'}, {name: 'Test', url: 'localhost'}]}];

//Then define models for database...

server.get('/', (req, res) => {
  res.render('App')
})

server.get('/App', (req, res) => {
  console.log(req.user);
  res.render('App');
})


// //TODO: 
// server.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });



//TODO: async await the handlers...
//API endpoint to send user stuff, only if authenticated I.e. 0th user in this case
server.get('/api/getUserData', async (req, res) => {
  // console.log(req.user);
  try {
    if (!req.user) {
      res.send({user:null});
    } else {
      const userData = await Api.getUserData(req.user);
      res.send(userData);
  

    }

  } catch (err) {
    res.redirect('/');

  }
})

//TODO refresh of page shouldnt give errors

server.post('/api/updateWSHosts', async (req, res) => {
//TODO: auth
  try {
    const userData = await Api.updateWSHosts(req.user, req.body);
    res.send(userData);

  } catch (err) {
    res.redirect('/');

  }
    

})

//TODO: Refactor this so I dont rely on names of object on host
// server.post('/api/removeWSHost', (req,res) =>{
//   // userData['req.user'].wsData.splice('')
//   //TODO adjust this to remove for a specific user
//   userData[0] = req.body;
//   console.log(req.body);
//   console.log(userData[0]);
//   res.send(userData[0]);
// })

server.get('/getUser', (req,res)=>{
  res.send(req.user);
})


server.get('*', (_,res) =>{
  res.render('404');
});

//TODO Error handling

server.listen(process.env.PORT || 3000, () => {
  console.log('server listening on port ' + (process.env.PORT || 3000))
})
