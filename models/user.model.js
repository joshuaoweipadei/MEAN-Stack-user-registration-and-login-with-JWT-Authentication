const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
const User = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationToken: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordCode: {
    type: String
  },
  resetPasswordExpiry: {
    type: Date
  },
}, { collection: 'josh' });

User.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // remove these props when object is serialized
      delete ret._id;
      delete ret.password;
  }
});

module.exports = mongoose.model('Users', User)