const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var _ = require("lodash");
const bcrypt = require("bcrypt");
const md5 = require("md5");

const mailer = require("../helper/mailer");
const authCheck = require("../middlewares/authCheck");

const User = require("../models/Users");
const { ObjectId } = require("mongodb");

//Fetch Login User Data

router.get("/api/user/:userId", authCheck, async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id)
      .populate("favouriteBook", "title description")
      .populate("bookToReadLater", "title description");

    console.log("user", user);

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

router.post(
  "/api/signup",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("role").notEmpty().withMessage("Role is required"),
    body("firstname").notEmpty().withMessage("Firstname is required"),
    body("lastname").notEmpty().withMessage("Lastname is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Does Not Match");
      }
      return true;
    }),
    body("password").custom((value, { req }) => {
      if (!value) {
        throw new Error("Password is required");
      }

      if (value.length < 6) {
        throw new Error("Password must be 6 character long");
      }

      return true;
    }),
  ],
  async (req, res, next) => {
    let verificationCode;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const userExists = await User.findOne({
        $or: [{ email: req.body.email }, { username: req.body.username }],
      });

      if (userExists) {
        if (userExists.username === req.body.username) {
          return res.status(400).json({ error: "Username Already Exists." });
        }

        if (userExists.email === req.body.email) {
          return res.status(400).json({ error: "Email Already Exists." });
        }
      }

      verificationCode = md5(new Date().getTime()).substr(0, 6);
      req.body.verificationCode = verificationCode;

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      req.body.password = hashedPassword;

      mailer({
        from: "zss@narola.email",
        to: "zss@narola.email",
        subject: "User verification",
        text: `Your Verification Code ${verificationCode}`,
        html: `<span> Your Verification Code ${verificationCode} </span>`,
      });

      const user = new User(req.body);

      await user.save();

      return res.status(201).json({
        message: "Please check Your mail for further instruction.",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something Went Wrong..." });
    }
  }
);

router.post(
  "/api/signin",
  (req, res, next) => {
    var errors = [];
    if (
      !req.body.hasOwnProperty("username") &&
      !req.body.hasOwnProperty("email")
    ) {
      errors.push({
        field: "username",
        message: "Please Enter Username/Email",
      });
    }
    if (!req.body.hasOwnProperty("password")) {
      errors.push({
        field: "password",
        message: "Please Enter Password",
      });
    }
    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }
    next();
  },
  async (req, res, next) => {
    try {
      const userExists = await User.findOne({
        $and: [
          {
            $or: [
              {
                email: req.body.email,
              },
              {
                username: req.body.username,
              },
            ],
          },
        ],
      })
        .populate("favouriteBook", "title description")
        .populate("bookToReadLater", "title description");

      if (!userExists) {
        return res.status(401).json({
          error: "Username or Password is Incorrect..",
        });
      }

      const match = await bcrypt.compare(
        req.body.password,
        userExists.password
      );

      if (!match) {
        return res.status(401).json({
          error: "Password is Incorrect..",
        });
      }

      if (!userExists.isVerified) {
        return res.status(401).json({
          error: "Your Account isn't verified.",
          isVerified: false,
        });
      }

      let token;
      token = jwt.sign(
        {
          _id: userExists._id,
          username: userExists.username,
          email: userExists.email,
          role: userExists.role,
          photo: userExists.photo,
          token: token,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        isLoggedIn: true,
        token: token,
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
        photo: userExists.photo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong...." });
    }
  }
);

router.patch("/api/user/verification/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(new ObjectId(req.params.userId));

    if (!user) {
      return res
        .status(402)
        .json({ error: "User Not Exists", isVerified: false });
    }

    if (req.body.passcode !== user.verificationCode) {
      return res.status(422).json({
        error: "Please Enter Correct Verification Code",
        isVerified: false,
      });
    } else {
      user.isVerified = true;
      user.verificationCode = "";
      user.save();
      return res
        .status(200)
        .json({ message: "Verification Successfull.", isVerified: true });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong.",
    });
  }
});

router.post("/api/forget-Password", async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(402)
        .json({ error: "User with this email does not exists" });
    }

    //sign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: 300,
    });

    const emailData = {
      from: "zss@narola.email",
      to: email,
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <a href='${process.env.CLIENT_URL}/reset-password/${token}'>click here.</a>`,
    };

    await user.updateOne({
      resetPasswordToken: token,
    });

    mailer(emailData);

    return res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instructions to reset your password.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

router.patch(
  "/api/reset-password",
  [
    body("newPassword").notEmpty().withMessage("This field is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { resetPasswordToken, newPassword } = req.body;

    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;

      return res.status(422).json({
        error: err,
      });
    }

    try {
      const user = await User.findOne({ resetPasswordToken });

      const updatedFields = {
        password: md5(newPassword),
        resetPasswordLink: "",
      };

      user.updated = Date.now();

      const userData = _.extend(user, updatedFields);

      await userData.save();

      res.status(200).json({
        message: `Great! Now you can login with your new password.`,
      });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong...." });
    }
  }
);

module.exports = router;
