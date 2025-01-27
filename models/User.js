const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
  logo: { type: String },
  crFile: { type: String },
  idCard: { type: String },
  licenseNo: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
  academyType: { type: String, required: true } // New field
});



const User = mongoose.model('User', userSchema);
module.exports = User;
