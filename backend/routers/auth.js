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
const Books = require("../models/Books");

const { ObjectId } = require("mongodb");

/**
 * @route    GET /api/user/:userId
 * @description Fetch auth user
 * @access PRIVATE
 */

router.get("/api/user/:userId", authCheck, async (req, res, next) => {
  try {
    var user = await User.findById(req.auth._id, { password: 0 })
      .populate("favouriteBook.book")
      .populate("bookToReadLater", "title description reference photo")
      .populate("currentReading.book", "title description reference photo");

    //RECOMMENDED BOOKS
    if (user.interest.length > 0) {
      var randomSuggetions = await Books.find({
        category: { $in: user.interest },
      });

      const shuffled = randomSuggetions.sort(() => 0.5 - Math.random());
      randomSuggetions = shuffled.slice(0, 3);

      user.interest = randomSuggetions;
    }

    if (user.favouriteBook.length > 0) {
      user.favouriteBook.sort(function (a, b) {
        return new Date(a.added) - new Date(b.added);
      });
    }

    if (user.currentReading.length > 0) {
      user.currentReading.sort(function (a, b) {
        return new Date(a.added) - new Date(b.added);
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

/**
 * @route    POST /api/signup
 * @description Register new user
 * @access PUBLIC
 */

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

      if (!req.body.googleId) {
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
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

      if (!req.body.googleId) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        req.body.password = hashedPassword;
      } else {
        req.body.password = req.body.googleId;
      }

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

/**
 * @route    POST /api/signin
 * @description Login user
 * @access PUBLIC
 */

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
        $or: [
          {
            email: req.body.username,
          },
          {
            username: req.body.username,
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
          error: "Username or Password is Incorrect..",
        });
      }

      if (!userExists.isVerified) {
        return res.status(401).json({
          error: `Your Account isn't verified.`,
          isNotVerified: true,
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
        username: userExists.username,
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

/**
 * @route    POST /api/social-login
 * @description Social login user
 * @access PUBLIC
 */

router.post("/api/social-login", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "Please Signup First" });
    }

    user = _.extend(user, req.body);
    user.updated = Date.now();
    user.save();

    let token;
    token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photo: user.photo,
        token: token,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1h",
      }
    );
    // return response with user and token to frontend client

    return res.json({
      isLoggedIn: true,
      token: token,
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      photo: user.photo,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong..." });
  }
});

/**
 * @route    PATCH /api/user/verification
 * @description User verification
 * @access PUBLIC
 */

router.patch("/api/user/verification", async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User Not Exists", isVerified: false });
    }

    if (user.isVerified) {
      return res.status(200).json({
        message: "Your account is already verified please login.",
        isVerified: true,
      });
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
      return res.status(200).json({
        message: "Verification Successfull Please Login.",
        isVerified: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong.",
    });
  }
});

/**
 * @route    POST /api/forget-password
 * @description User forget password
 * @access PUBLIC
 */

router.post("/api/forget-password", async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this username / email does not exists" });
    }

    //sign token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: 300,
    });

    const emailData = {
      from: "zss@narola.email",
      to: "zss@narola.email",
      subject: "Password Reset Instructions",
      text: `Please use the following link to reset your password: ${process.env.REACT_APP_URI}/reset-password/${token}`,
      html: `<p>Please use the following link to reset your password:</p> <a href='${process.env.REACT_APP_URI}/reset-password/${token}'>click here.</a>`,
    };

    await user.updateOne({
      resetPasswordToken: token,
    });

    mailer(emailData);

    return res.status(200).json({
      message: `Email has been sent to zss@narola.email. Follow the instructions to reset your password.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

/**
 * @route    PATCH /api/reset-password
 * @description User reset password
 * @access PUBLIC
 */

router.patch(
  "/api/reset-password",
  [
    body("password").notEmpty().withMessage("This field is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 character long."),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    const { resetPasswordToken, password } = req.body;

    if (!errors.isEmpty()) {
      const err = errors.array()[0].msg;

      return res.status(422).json({
        error: err,
      });
    }

    try {
      const user = await User.findOne({ resetPasswordToken });

      if (!user) {
        return res.status(404).json({
          error: "Hmmm... Your Reset Password Link Might Expired.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedFields = {
        password: hashedPassword,
        resetPasswordToken: "",
      };

      user.updated = Date.now();

      const userData = _.extend(user, updatedFields);

      await userData.save();

      return res.status(200).json({
        message: `Great! Now you can login with your new password.`,
      });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong...." });
    }
  }
);

/**
 * @route    GET /api/find-user-name/:userName
 * @description Find usernamee existance
 * @access PUBLIC
 */

router.get("/api/find-user-name/:userName", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.userName });
    if (!user) {
      return res.json({ hasUsername: false });
    } else {
      console.log(user);
      return res.json({ hasUsername: true });
    }
  } catch (error) {}
});

/**
 * @route    PATCH /api/send/verification-code
 * @description Send verification code email
 * @access PUBLIC
 */

router.patch("/api/send/verification-code", async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this username / email does not exists" });
    }

    const verificationCode = md5(new Date().getTime()).substr(0, 6);

    await user.updateOne({
      verificationCode,
    });

    mailer({
      from: "zss@narola.email",
      to: "zss@narola.email",
      subject: "User verification",
      text: `Your Verification Code ${verificationCode}`,
      html: `<span> Your Verification Code ${verificationCode} </span>`,
    });

    return res.status(200).json({
      message: `Email has been sent to zss@narola.email. Follow the instructions to reset your password.`,
    });
  } catch (error) {
    res.send({ error: "Something went wrong..." });
  }
});

module.exports = router;
