const express = require("express");
const router = express.Router();

const authCheck = require("../middlewares/authCheck");

const User = require("../models/Users");
const Books = require("../models/Books");
const { ObjectId } = require("mongodb");

router.get("/api/report/most-liked-book", authCheck, async (req, res, next) => {
  try {
    var books = await Books.aggregate([
      { $match: { author: ObjectId(req.auth._id) } },

      { $unwind: "$likes" },
      
      {
        $group: {
          _id: {
            _id: "$_id",
            title: "$title",
            description: "$description",
            photo: "$photo",
            dislikes: "$dislikes",
            numberOfRead: "$numberOfRead",
          },
          count: { $sum: 1 },
        },
      },
    ]).sort({ count: -1 });
    
    return res.json({ mostLikedBooks: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong.." });
  }
});

router.get("/api/report/most-read-book", authCheck, async (req, res, next) => {
  try {
    var books = await Books.aggregate([
      { $match: { author: ObjectId(req.auth._id) } },
      
      { $unwind: "$numberOfRead" },

      {
        $group: {
          _id: {
            _id: "$_id",
            title: "$title",
            description: "$description",
            photo: "$photo",
            dislikes: "$dislikes",
            likes: "$likes",
          },
          count: { $sum: 1 },
        },
      },
    ]).sort({ count: -1 });

    return res.json({ mostReadBooks: books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong.." });
  }
});

module.exports = router;
