const router = require("express").Router();
const Workout = require("../models/workout.js");
const path = require("path");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//route to access workouts database
router.get("/api/workouts", function(req, res) {
  Workout.find({}, function(err, workouts) {
    res.json(workouts);
  });
});

router.get("/api/workouts/range", function(req, res) {
  Workout.find({}, function(err, workouts) {
    res.json(workouts);
  });
});

//route to exercise.html
router.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

//post request creates a new instance of workout in the database
router.post("/api/workouts", (req, res) => {
  console.log('Test')
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log("routes error 1");
    });
});

router.put("/api/workouts/:id", function(req, res) {
  Workout.findByIdAndUpdate( req.params.id, {$push: {exercises: req.body} })
  .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
      console.log("routes error 2");
    });
});

//route to access stats.html
router.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;