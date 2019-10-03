var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//  TODO: validate using express-validate module
var userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: true
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
  password: {
    type: String
    // validate: {
    //   validator: (val) => {
    //     return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!_$%@#£€*?&]{8,}$/.test(val)
    //   },
    //   message: 'Password is not valid'
    // }
  },
  confirmed_password: String,
  last_seen: Date
}, {
  timestamps: true
});

var User = mongoose.model('User', userSchema);
module.exports = User;