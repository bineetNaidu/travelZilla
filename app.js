require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const engine = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passportSetup = require("./config/passoprt-setup");
const cookieSession = require("cookie-session");
const passport = require("passport");

const apiRouter = require("./routes/index");
const authRouters = require("./routes/auth-routes");

const app = express();

// connecting MongoDB
const dbURI =
    process.env.DB_CONNECTION || "mongodb://localhost:27017/travelzilla";

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("connected to db");
    })
    .catch((err) => console.log("something is WORNG --- " + err.message));

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
// auth passport
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // a day
        keys: process.env.COOKIE_KEY,
    })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// mounting routes
app.use("/api", apiRouter);
/* GET home page. */
app.get("/", (req, res, next) => {
    res.render("index", { title: "Express", user: "" });
});
app.use("/auth", authRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
