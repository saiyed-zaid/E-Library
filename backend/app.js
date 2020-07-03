const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const User = require("./models/Users");

/* 
  ROUTETS
*/
const authRouter = require("./routers/auth");
const bookRouter = require("./routers/books.route");
const planRouter = require("./routers/plans.route");
const bookCategoryRouter = require("./routers/bookCategories.route");
const userRouter = require("./routers/users.route");
const writerRouter = require("./routers/writer.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/upload", express.static("upload"));

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "upload"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

app.use(
  multer({ storage: multerConfig }).fields([
    { name: "photo" },
    { name: "reference" },
  ])
);

app.post("/api/upload", (req, res, next) => {
  //SEND PUBLIC URL
  if (req.files.photo && req.files.photo[0]) {
    return res.json({
      isUploaded: true,
      public_uri: `${process.env.SERVER_URI}/upload/${req.files.photo[0].filename}`,
    });
  } else if (req.files.reference && req.files.reference[0]) {
    return res.json({
      isUploaded: true,
      public_uri: `${process.env.SERVER_URI}/upload/${req.files.reference[0].filename}`,
    });
  }
});

app.use(bookCategoryRouter);
app.use(authRouter);
app.use(bookRouter);
app.use(planRouter);
app.use(userRouter);
app.use(writerRouter);

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
