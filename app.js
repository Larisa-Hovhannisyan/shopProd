const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then((res) => console.log("DB Connected!"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secretkey123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);

const productRouter = require("./routes/product");
app.use("/", productRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
