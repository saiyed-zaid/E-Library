require("dotenv").config();
const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  let headers = req.headers;
  let token, decodedToken;
  try {
    if (!headers.authorization || !headers.authorization.split(" ")[1]) {
      return res.status(401).json({ error: "Authorization Failed" });
    }
    token = headers.authorization.split(" ")[1];

    decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.auth = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Authorization Failed" });
    }

    return res.status(500).json({ error: "Something Went Wrong..." });
  }
};

module.exports = authCheck;
