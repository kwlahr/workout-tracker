const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Workout = require("./models/workout.js");
// const api = require("./public/api.js");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout-tracker", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
app.use(require("./public/api.js"), function(req, res) {
  if (err) {
    throw err;
  } else {
    console.log(req);
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log("error on workouts");
    });
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
