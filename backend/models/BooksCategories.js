const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("BooksCategory", bookCategorySchema);
