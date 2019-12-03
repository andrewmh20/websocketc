import User from './../models/user'

class Api {


  static async getOrCreateUser(id, name) {
    
    let user = null;
    let error = null;
    try {
      user = await User.findOne({ googleId: id });

    } catch (err) {
      error = err;
    }

    if (user == null) {
      try {      
        // eslint-disable-next-line require-atomic-updates
        user = await User.create({ googleId: id, givenName: name});
      } catch (err) {
        error = err;
      }
    }
    return new Promise((res,rej)=>{
      if (error == null) {
        res(user);
      } else {
        console.log(error);
        rej(error);
      }

    })
  
  }

  static async getUserData(user) {
    let error = null;
    let userObj = null;

    try {
      userObj = await User.findOne({ googleId: user.googleId })
  
    } catch (err) {
      error = err;
    }
    return new Promise((res,rej)=>{
      if (!error) {
        res({user: userObj.givenName, wsData: userObj.wsData})
      } else {
        rej(error); 

      }
    })

  }

  static async updateWSHosts(user, userData) {
    let err = null;
    let updatedUser = null;
    try {
      updatedUser = await User.findOneAndUpdate({ googleId: user.googleId }, {wsData: userData.wsData}, {new: true})
    } catch (_) {
      err = new Error('Database Error');
    }

    return new Promise((resolve, reject) =>{
      if (err != null) {
        reject(err);
      } else if (updatedUser == null) {
        reject(new Error('Could not Find User! This shouldn\'t Happen'))
      } else {
        resolve({user: updatedUser.givenName, wsData: updatedUser.wsData})
      }
    })
  }

  


}
export default Api;