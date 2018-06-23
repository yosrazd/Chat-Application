import mongoose from 'mongoose';

import Message from './message';
import User from './user';

var Schema = mongoose.Schema;

var Conversation = new Schema({
  messages: {type: [new Message()]},
  participants: {type: [new User()]}
});

module.exports = mongoose.model('Conversation', Conversation);
