const { ObjectId } = require("mongodb");
const Books = require("../models/Books");

const hasAuthorization = async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectId(req.params.bookId));

    if (!book) {
      return res.status(402).json({ error: "Book Not Found" });
    }

    if (book.author.toString() !== req.auth._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized user to take this action" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: " Something Went Wrong..." });
  }
};

module.exports = hasAuthorization;
