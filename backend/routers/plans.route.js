const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

router.post("/api/plan/:userId", async (req, res, next) => {
  try {
      //Writer Validation Required.
    const user = await User.findById(new ObjectID(req.params.userId));

    if (!user) {
      return res.status(402).json({ error: "User Not Found" });
    }
    _.extend(user, req.body);

    await user.save();

    return res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something Went Wrong...");
  }
});

module.exports = router;
