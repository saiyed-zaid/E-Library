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
    ref: "User",
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
    ref: "User",
  },
  dislikes: {
    type: Array,
    ref: "User",
  },
  comments: [
    {
      postedBy: {
        type: ObjectId,
        ref: "User",
      },
      created: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
      },
    },
  ],
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
  numberOfRead: {
    type: Array,
    ref: "User",
  },
  ratings: [
    {
      user: {
        type: ObjectId,
        ref: "User",
      },
      rate: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Books", bookSchema);
