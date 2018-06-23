import mongoose from 'mongoose';

import User from './user';

var Schema = mongoose.Schema;

var Message = new Schema({
  text: {type: String},
  sender: {type: User},
  receiver: {type: User},
  time: {type: Date}
});

module.exports = mongoose.model('Message', Message);
