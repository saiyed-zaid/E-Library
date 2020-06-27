const express = require("express");
const router = express.Router();

const _ = require("lodash");

const BookCategory = require("../models/BooksCategories");
const BooksCategories = require("../models/BooksCategories");
const { ObjectID } = require("mongodb");

router.post("/api/book/categories", async (req, res, next) => {
  try {
    const book = new BookCategory(req.body);
    await book.save();
    return res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.get("/api/book/categories", async (req, res, next) => {
  try {
    const categories = await BookCategory.find({}, { __v: 0 });

    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.patch("/api/book/categories/:categoryId", async (req, res, next) => {
  try {
    const bookCategories = await BooksCategories.findById(
      new ObjectID(req.params.categoryId)
    );

    _.extend(bookCategories, req.body);

    await bookCategories.save();

    return res.status(200).json(bookCategories);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.delete("/api/book/categories/:categoryId", async (req, res, next) => {
  try {
    const bookCategories = await BooksCategories.findById(
      new ObjectID(req.params.categoryId)
    );

    await bookCategories.deleteOne();

    return res.status(200).json("Category Deleted Successfully...");
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

router.get("/api/book/categories/:categoryId", async (req, res, next) => {
  try {
    const bookCategory = await BooksCategories.findById(
      new ObjectID(req.params.categoryId),
      { __v: 0 }
    );

    return res.status(200).json({ bookCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong..." });
  }
});

module.exports = router;
