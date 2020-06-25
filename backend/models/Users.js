const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
  },
  interest: {
    type: Array,
    ref: "bookscategories",
  },
  plan: {
    type: String,
    lowercase: true,
  },
  favouriteBook: {
    type: Array,
    ref: "Books",
  },
  bookToReadLater: {
    type: Array,
    ref: "Books",
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
  },
  verificationCode: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
