import express from 'express';
import Api from './../db/api/api'

const router = express.Router();


router.get('/getUserData', async (req, res) => {
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