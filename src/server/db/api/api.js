import User from './../models/user'

class Api {


  static async getOrCreateUser(id, name) {


    // let returnVal = {err: null, user: null};
    // TODO: this is not ideal as it doesnt allow for the name changing on googles end. But okay for now.
    // HJust want to elet google handle the passwords basically.
    
    let user = null;
    let error = null;
    try {
      user = await User.findOne({ googleId: id });

    } catch (err) {
      error = err;
    }

    if (user == null) {
      // console.log('Making User')
      try {      
        //TODO Whats this about? How to fix it
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

  static async addWSHost(user, userData) {
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

  //TODO

}
export default Api;