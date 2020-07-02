const express = require("express");
const router = express.Router();

const authCheck = require("../middlewares/authCheck");

const User = require("../models/Users");
const Books = require("../models/Books");

router.get("/api/report/most-liked-book", authCheck, async (req, res, next) => {
  try {
    var books = await Books.aggregate([
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

    return res.json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong.." });
  }
});

module.exports = router;
