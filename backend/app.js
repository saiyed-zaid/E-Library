const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const User = require("./models/Users");

/* 
  ROUTETS
*/
const authRouter = require("./routers/auth");
const bookRouter = require("./routers/books.route");
const planRouter = require("./routers/plans.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use(authRouter);
app.use(bookRouter);
app.use(planRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
