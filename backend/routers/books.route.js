const express = require("express");
const router = express.Router();

const Books = require("../models/Books");
const Users = require("../models/Users");
const authCheck = require("../middlewares/authCheck");
const hasAuthorization = require("../middlewares/hasAuthorization");

const { body, validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const { extend } = require("lodash");

//return empty array when no books found
router.get("/api/books", async (req, res, next) => {
  try {
    const books = await Books.find({ status: true });

    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

//return null when book not found
router.get("/api/books/:bookId", async (req, res, next) => {
  try {
    const book = await Books.findOne({
      _id: req.params.bookId,
      status: true,
    });

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

//return empty array when no books found
router.get("/api/books/author/:userId", async (req, res, next) => {
  try {
    const books = await Books.find({
      author: new ObjectId(req.params.userId),
      status: true,
    });

    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.post(
  "/api/book/:userId",
  [
    body("title").notEmpty().withMessage("Title is Required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("author").notEmpty().withMessage("Author is required"),
    body("category").notEmpty().withMessage("Categpry is required"),
    body("reference").notEmpty().withMessage("Reference is required"),
    body("pages").notEmpty().withMessage("Pages is required"),
    body("photo").notEmpty().withMessage("Photo is required"),
    body("isOnTrueEvent").notEmpty().withMessage("True Event is required"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      const userExists = await Users.findById(req.params.userId);

      if (!userExists) {
        return res.status(401).json({
          error: "User Not Exists",
        });
      } else {
        if (userExists.isVerified !== true) {
          return res
            .status(401)
            .json({ error: "Your Account is Still Not Verified" });
        }
      }

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const book = new Books({
        ...req.body,
        author: new ObjectId(req.params.userId),
      });

      await book.save();

      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: "Something Wnt Wrong..." });
    }
  }
);

router.patch(
  "/api/books/:bookId",
  authCheck,
  hasAuthorization,
  async (req, res, next) => {
    try {
      const book = await Books.findById(new ObjectId(req.params.bookId));

      extend(book, req.body);

      await book.save();

      res.status(200).json({ book });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong..." });
    }
  }
);

router.delete(
  "/api/books/:bookId",
  authCheck,
  hasAuthorization,
  async (req, res, next) => {
    try {
      const book = Books.findById(new ObjectId(req.params.bookId));

      if (!book) {
        return res.status(402).json({ error: "Book Not Found" });
      }

      await book.deleteOne();

      res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong..." });
    }
  }
);

module.exports = router;
