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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
//telling the following routes to use api.js when "app" is called
app.use(require("./public/api.js"), function(req, res) {
  if (err) {
    throw err;
  } else {
    console.log(req);
  }
});

//route to access index.html
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//route to access workouts database
app.get("/api/workouts", function(req, res) {
  // res.sendFile(path.join(__dirname, "index.html"));
  Workout.find({}, function(err, workouts){res.json(workouts)});
});

app.get("/api/workouts/range", function(req, res) {
  Workout.find({}, function(err, workouts){res.json(workouts)});
});

//get route for individual workouts
app.get("/api/workouts/:id", function(req, res) {
  // Workout.find({_id: id(`${req.params.id}`)}, function(err, workouts){res.json(workouts)});
  console.log(req.params.id);
  Workout.find({}, function(err, workouts){res.json(workouts)});
});

//updates instances of workouts based on id
app.put("/api/workouts/:id", function(req, res) {
  console.log(req.params.id);
})

//route to exercise.html
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

//post request creates a new instance of a workout in the database
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

//route to access stats.html
app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

//sets port to lacalhost:3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
