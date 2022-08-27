const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
})

var User = mongoose.model('User', userSchema);

module.exports =  User; 