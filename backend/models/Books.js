const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: ObjectId,
    ref: "Users",
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "BooksCategory",
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  isOnTrueEvent: {
    type: Boolean,
    required: true,
  },
  likes: {
    type: Array,
    ref: "Users",
  },
  dislikes: {
    type: Array,
    ref: "Users",
  },
  comments: {
    type: Array,
    ref: "Users",
  },
  status: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model("Books", bookSchema);
