import mongoose from 'mongoose'
import findOrCreate from 'mongoose-find-or-create'


var userSchema = new mongoose.Schema({
  googleId: String,
  givenName: String,
  wsData: [{name: String, url: String, 
    saved: [{fileName: String, time: String, text: String}]
  }]
})
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema)
