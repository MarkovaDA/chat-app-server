var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required'
  },
  firstname: {
    type: String,
    required: 'Firstname is required'
  },
  lastname: {
    type: String,
    required: 'Lastname is required'
  },
  email: String,
  password: String,
  confirmed_password: String,
  last_seen: Date
}, {
  timestamps: true
});

var User = mongoose.model('User', userSchema);
module.exports = User;