var mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/chat',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    },
    (err) => {
      if (err) throw err
    }
  )
}