import mongoose from 'mongoose';

import User from './user';

var Schema = mongoose.Schema;

var Profile = new Schema({
  user : { type: User },
  name: { type: String },
  lastname: { type: String },
  email: { type: String }
});

module.exports = mongoose.model('Profile', Profile);
