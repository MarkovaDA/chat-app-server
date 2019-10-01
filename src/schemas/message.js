var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  text: String,
  unread: Boolean,
  dialog: { type: Schema.Types.ObjectId, ref: 'Dialog' },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
  // TODO: attachments
}, {
  timestamps: true
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;