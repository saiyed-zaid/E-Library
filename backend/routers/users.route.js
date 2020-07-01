const express = require("express");
const router = express.Router();

const authCheck = require("../middlewares/authCheck");

const User = require("../models/Users");

router.patch("/api/user/book/read", authCheck, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id);

    if (!user.plan) {
      return res.json({
        error: "Please select plan.",
        canRead: false,
        planError: true,
      });
    }

    if (
      user.currentReading &&
      user.currentReading.length >= 1 &&
      user.currentReading.indexOf(req.body.bookId) !== -1
    ) {
      res.status(200).json({ canRead: true });
    }

    if (user.plan === "basic" && user.currentReading) {
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
    user.currentReading.push(req.body.bookId);

    await user.save();

    res.status(200).json({ canRead: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong..." });
  }
});

//remove book from current read
router.delete(
  "/api/user/book/read/:bookId",
  authCheck,
  async (req, res, next) => {
    try {
      const user = await User.findById(req.auth._id);

      const index = user.currentReading.indexOf(req.params.bookId);

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
