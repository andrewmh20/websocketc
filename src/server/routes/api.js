import express from 'express';
import Api from './../db/api/api'


const router = express.Router();

const isAuthenticated = function isAuthenticated(req, res, next) {
  if (req.user)
    return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/NotAuthorized');
}


router.get('/getUserData', isAuthenticated, async (req, res) => {
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
  
  
router.post('/updateWSHosts', async (req, res) => {
  //TODO: auth
  try {
    const userData = await Api.updateWSHosts(req.user, req.body);
    res.send(userData);
  } catch (err) {
    res.redirect('/');
  
  }
      
  
})

export default router;