import User from './../models/user'

class Api {


  static getOrCreateUser(id, name, done) {

    // User.findOrCreate({ googleId: id }, (err, user, created) => {
    //   console.log('Created');
    //   // return (done(err,user))
    //   done(err,user);
    //   User.findOrCreate({}, (err, user, created) => {
    //     console.log('Did not create');
    //     // return (err,user);
    //     done(err,user);
    //   })
    // });

    User.findOneAndUpdate(
      {googleId: id}, 
      {googleId: id}, 
      {upsert: true, new: true, runValidators: true}, // options
      (err, user) => { // callback
        if (err) {
          return done(err,null);     
        } else {
          console.log('added' + user);
          return done(null,user)         
        }
      }
  
    )
  }
    
  //   });)

  //TODO: this is not ideal as it doesnt allow for the name changing on googles end. But okay for now.
  //HJust want to elet google handle the passwords basically.
  //   User.findOne({ googleId: id }, (err, user) => {
  //   //console.log(err);
  //   //console.log(user);
  //     if (err) {
  //       return done(err)
  //     }
  //     if (!err && !user) {
  //       const user = new User({ googleId: id, givenName: name})
  //       console.log("Making User")

  //       user.save(done);
  //       return done(null, false);
  //     }
  //     if (!err && user) {
  //       console.log("User exists")
  //       return done(null, user);
  //     }
  //   });
  

  static getUserData(user,cb) {
    if (!user) {
      cb(new Error('User not logged in'), null)
    } else {
      User.findOne({ googleId: user.googleId }, (err, user) => {
      // console.log('here' + user);
        cb(err,{user: user.givenName, wsData: user.wsData});
      });
    }
  }

  static addWSHost(user, userData, cb) {

    if (!user) {
      cb(new Error('User not logged in'), null)
    } else {

      User.findOne({ googleId: user.googleId }, (err, user) => {
      // console.log('here' + user);
        user = new User({googleId: user.googleId, givenName: user.givenName, wsData: userData.wsData})
        user.save( (err)=>{
          if (err) {
            cb(err,null);
          }
        });
        if (err) {
          cb(err,null);
        } else {
          cb(null, userData);
        }
      });

    }
  }

}
export default Api;