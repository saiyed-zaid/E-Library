const express = require("express");
const router = express.Router();

const authCheck = require("../middlewares/authCheck");
const monthlyReadingChecker = require("../helper/monthlyReadingCheck");

const User = require("../models/Users");
const Books = require("../models/Books");

/**
 * @route    PATCH /api/user/book/read
 * @description UPDATE user current reading book
 * @access PRIVATE
 */

router.patch("/api/user/book/read", authCheck, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);
    const book = await Books.findById(req.body.bookId);

    if (!user.plan) {
      //If plan not selected by user
      return res.json({
        error: "Please select plan.",
        canRead: false,
        planError: true,
      });
    }

    if (user.currentReading && user.currentReading.length >= 1) {
      const index = user.currentReading.findIndex((value) => {
        return value.book.toString() === req.body.bookId;
      });

      //If Selected book is already in currentReading Then

      if (index !== -1) {
        return res.status(200).json({ canRead: true });
      }
    }

    if (user.plan === "basic" && user.currentReading) {
      //Total book read according to plan

      const hasLimitExcede = monthlyReadingChecker(user, 1);

      if (hasLimitExcede) {
        return res.json({
          error:
            "You have exceede the limit for reading book for this month, Please upgrade your plan to read more books.",
          currentPlan: "basic",
          canRead: false,
          planError: false,
        });
      }

      if (user.currentReading.length >= 1) {
        return res.json({
          error: "Please upgrade your plan to read more books.",
          currentPlan: "basic",
          canRead: false,
          planError: false,
        });
      }
    }

    if (user.plan === "standard" && user.currentReading) {
      const hasLimitExcede = monthlyReadingChecker(user, 5);

      if (hasLimitExcede) {
        return res.json({
          error:
            "You have excede the limit for reading book for this month, Please upgrade your plan to read more books.",
          currentPlan: "standard",
          canRead: false,
          planError: false,
        });
      }

      if (user.currentReading.length >= 3) {
        return res.json({
          error: "Please upgrade your plan to read more books.",
          currentPlan: "standard",
          canRead: false,
          planError: false,
        });
      }
    }

    if (user.plan === "prime" && user.currentReading) {
      const hasLimitExcede = monthlyReadingChecker(user, 15);

      if (hasLimitExcede) {
        return res.json({
          error:
            "You have excede the limit for reading book for this month, Please upgrade your plan to read more books.",
          currentPlan: "standard",
          canRead: false,
          planError: false,
        });
      }

      if (user.currentReading.length >= 7) {
        return res.json({
          error: "Current book reading limits excede.",
          currentPlan: "prime",
          canRead: false,
          planError: false,
        });
      }
    }

    //when everything is alright
    user.currentReading.push({
      book: {
        _id: req.body.bookId,
      },
      added: Date.now(),
    });

    //Add user _id to Book model for numbe of read
    if (book.numberOfRead.indexOf(req.auth._id) === -1) {
      book.numberOfRead.push({
        _id: req.auth._id,
      });
      await book.save();
    }

    await user.save();

    res.status(200).json({ canRead: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong..." });
  }
});

/**
 * @route    DELETE /api/user/book/read/:bookId
 * @description DELETE book from user current reading list
 * @access PRIVATE
 */

router.delete(
  "/api/user/book/read/:bookId",
  authCheck,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.auth._id);

      const index = user.currentReading.findIndex((value) => {
        return value.book.toString() === req.params.bookId;
      });

      if (index !== -1) {
        user.currentReading.splice(index, 1);

        //when everything is alright
        //user.currentReading.push(req.body.bookId);

        await user.save();

        return res.status(200).json({
          successText: "Book removed from continue list...",
          isRemoved: true,
        });
      } else {
        return res.json({ error: "Book not found...", isRemoved: false });
      }
    } catch (error) {
      res.status(500).json({ error: "Something went wrong..." });
    }
  }
);

module.exports = router;
