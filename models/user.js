import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

var Schema = mongoose.Schema;

var User = new Schema({
  login : {
    type: String
  },
  password : {
    type: String
  }
});

// hashing a password before saving it to the database
User.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

User.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      return resolve(isMatch)
    })
  })
}
User.methods.getToken = function() {
  const user = this;
  return jwt.sign({
    login: user.login,
    password: user.password
  })
}
module.exports = mongoose.model('User', User);
