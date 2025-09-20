const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const app = express();

mongoose.connect("mongodb+srv://Larisa:larisapass@cluster0.gn5udjb.mongodb.net/productsDB?retryWrites=true&w=majority&appName=Cluster0")
  .then((res) => console.log("DB Connected!"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.use("/", indexRouter);
app.use("/", authRouter);

const productRouter = require("./routes/product");
app.use("/", productRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;
