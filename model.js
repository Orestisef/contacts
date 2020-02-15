const mongoose = require('mongoose');
let validator = require('validator');
const Schema = mongoose.Schema;


let Contact = new Schema({
  contact_name: {
    type: String,
    required: true,
    lowercase: true
  },
  contact_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate:(value) => {
      return validator.isEmail(value)
    }
  },
  contact_address: {
    type: String,
    lowercase: true
  },
  contact_phone: [{
      type: String
  }]
});


module.exports = mongoose.model('Contact', Contact);
