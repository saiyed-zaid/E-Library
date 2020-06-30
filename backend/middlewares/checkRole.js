require("dotenv").config();
const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  let headers = req.headers;
  let token, decodedToken;
  try {
    if (!headers.authorization || !headers.authorization.split(" ")[1]) {
      req.privateBookPrivacy = true;
    }
    token = headers.authorization.split(" ")[1];

    decodedToken = jwt.verify(token, process.env.JWT_KEY);

    if (decodedToken._id === req.params.userId) {
      req.privateBookPrivacy = false;
    }

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token Expired" });
    }

    return res.status(500).json({ error: "Something Went Wrong..." });
  }
};

module.exports = authCheck;
