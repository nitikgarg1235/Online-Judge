const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Session = require("express-session");
const passport = require("passport");
require("./authentication/PassportLocal");

const PORT = process.env.PORT || 7777;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  Session({
    secret: "My Secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "views")));

app.use("/", require("./routes/IndexRoute").router);

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Could not start the server.");
    return;
  }
  console.log("Server is running at http://localhost:" + PORT);
});



