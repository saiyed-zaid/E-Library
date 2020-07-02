const express = require("express");
const router = express.Router();

const Books = require("../models/Books");
const Users = require("../models/Users");
const authCheck = require("../middlewares/authCheck");
const checkRole = require("../middlewares/checkRole");
const hasAuthorization = require("../middlewares/hasAuthorization");

const { body, validationResult } = require("express-validator");
const { ObjectId, ObjectID } = require("mongodb");
const { extend } = require("lodash");

//return empty array when no books found
router.get("/api/books", async (req, res, next) => {
  try {
    const books = await Books.find({ status: true }).populate(
      "category",
      "name"
    );
    return res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

//return empty array when no books found
router.get("/api/book/authors", async (req, res, next) => {
  try {
    const authors = await Users.find(
      {
        role: "writer",
        isVerified: true,
      },
      { firstname: 1, _id: 1 }
    );
    return res.status(200).json({ authors });
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
    }).populate("comments.postedBy", "username");

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

//return empty array when no books found
router.get("/api/books/author/:userId", checkRole, async (req, res, next) => {
  var books = [];

  try {
    if (req.privateBookPrivacy) {
      books = await Books.find({
        author: new ObjectId(req.params.userId),
        status: true,
      });
    } else {
      books = await Books.find({
        author: new ObjectId(req.params.userId),
      });
    }
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
    /* body("author").notEmpty().withMessage("Author is required"), */
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
      console.log(error);
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
        return res.status(404).json({ error: "Book Not Found" });
      }

      await book.deleteOne();

      res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: "Something Went Wrong..." });
    }
  }
);

router.patch("/api/book/comment", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    book.comments.push({
      postedBy: req.auth._id,
      created: Date.now(),
      text: req.body.comment,
    });
    await book.save();

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.patch("/api/book/like", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasDisliked = book.dislikes.findIndex(
      (dislike) => dislike._id === req.auth._id
    );

    if (hasDisliked !== -1) {
      book.dislikes.splice(hasDisliked, 1);
      await book.save();
    }

    const hasLiked = book.likes.findIndex((like) => like._id === req.auth._id);

    if (hasLiked === -1) {
      book.likes.push({ _id: req.auth._id, created: Date.now() });
    } else {
      book.likes.splice(hasLiked, 1);
    }

    await book.save();

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.patch("/api/book/dislike", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasLiked = book.likes.findIndex((like) => like._id === req.auth._id);

    if (hasLiked !== -1) {
      book.likes.splice(hasLiked, 1);
      await book.save();
    }

    const hasDisliked = book.dislikes.findIndex(
      (dislike) => dislike._id === req.auth._id
    );

    if (hasDisliked === -1) {
      book.dislikes.push({ _id: req.auth._id, created: Date.now() });
    } else {
      book.dislikes.splice(hasDisliked, 1);
    }
    await book.save();

    return res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.patch("/api/book/favourite", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));
    const user = await Users.findById(new ObjectID(req.auth._id));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasFavourite = user.favouriteBook.findIndex((value) => {
      return value.book.toString() === book._id.toString();
    });

    if (hasFavourite === -1) {
      user.favouriteBook.push({
        book: {
          _id: book._id,
        },
        added: Date.now(),
      });
    } else {
      if (hasFavourite !== -1) {
        user.favouriteBook.splice(hasFavourite, 1);
      }
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.delete("/api/book/favourite", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));
    const user = await Users.findById(new ObjectID(req.auth._id));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasFavourite = user.favouriteBook.findIndex(
      (book) => book._id === req.body.bookId
    );

    if (hasFavourite !== -1) {
      user.favouriteBook.splice(hasFavourite, 1);

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.patch("/api/book/read-later", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));
    const user = await Users.findById(new ObjectID(req.auth._id));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasReadLater = user.bookToReadLater.indexOf(book._id);

    if (hasReadLater === -1) {
      user.bookToReadLater.push({
        _id: book._id,
      });
    } else {
      user.bookToReadLater.splice(hasReadLater, 1);
    }
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.delete("/api/book/read-later", authCheck, async (req, res, next) => {
  try {
    const book = await Books.findById(new ObjectID(req.body.bookId));
    const user = await Users.findById(new ObjectID(req.auth._id));

    if (!book) {
      return res.status(404).json({ error: "Book Not Found" });
    }

    const hasReadLater = user.bookToReadLater.findIndex(
      (book) => book._id === req.body.bookId
    );

    if (hasReadLater !== -1) {
      user.bookToReadLater.splice(hasReadLater, 1);

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

module.exports = router;
