// models/personalUser.js
const mongoose = require('mongoose');

const personalUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\+?[0-9]+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true, default:true },
});

const PersonalUser = mongoose.model('PersonalUser', personalUserSchema);
module.exports = PersonalUser;
