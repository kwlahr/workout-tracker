const express = require("express");
// const router = require("express").Router();

const mongoose = require("mongoose");
const path = require("path");
// const Workout = require("./models/workout.js");
// const api = require("./public/api.js");

const PORT = process.env.PORT || 3000;

const app = express();

const err = "error";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
//telling the following routes to use api.js when "app" is called
app.use(require("./public/api.js"), function(req, res) {
  if (err) {
    console.log("server err 1");
  } else {
    console.log(req);
  }
});

app.use(require("./routes/routes.js"), function(req, res) {
  if (err) {
    console.log("server err 2");
  } else {
    console.log(req);
  }
});

//sets port to lacalhost:3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
