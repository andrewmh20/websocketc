import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google/login',
  passport.authenticate('google', {
    scope: ['profile']
  }
  ));

//TODO: This allows for multiple auth strategies in the future
router.get('/login', (req,res)=>{
  res.redirect('/auth/google/login');

});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


//TODO Handle errors
router.get('/google/callback', 
//TODO: redirect to "login failed page"
  passport.authenticate('google', {failureRedirect: '/' , successRedirect: '/'})
  // (req, res) => {
  //   // Successful authentication, redirect home.
  //  res.redirect('/App');
  // }
);

export default router;
  
