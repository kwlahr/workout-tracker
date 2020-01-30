const express = require("express");
// const router = require("express").Router();

const mongoose = require("mongoose");
const path = require("path");
// const Workout = require("./models/workout.js");
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

app.use(require("./routes/routes.js"), function(req, res) {
  if (err) {
    throw err;
  } else {
    console.log(req);
  }
});

//route to access index.html
// router.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// //route to access workouts database
// router.get("/api/workouts", function(req, res) {
//   // res.sendFile(path.join(__dirname, "index.html"));
//   Workout.find({}, function(err, workouts) {
//     res.json(workouts);
//   });
// });

// router.get("/api/workouts/range", function(req, res) {
//   Workout.find({}, function(err, workouts) {
//     res.json(workouts);
//   });
// });

// //route to exercise.html
// router.get("/exercise", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/exercise.html"));
// });

// //get route for individual workouts by id
// // router.get("/api/workouts/:id", function(req, res) {
// //   Workout.find({ id: `${req.params.id}` }, function(err, workouts) {
// //     res.json(workouts);
// //     if (err) {
// //       throw err;
// //     } else {
// //       // console.log(req.params.id);
// //     }
// //   });
// // });
// //post request creates a new instance of a workout in the database
// router.post("/api/workouts", (req, res) => {
//   console.log('Test')
//   Workout.create({})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//       //console.log(body);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//       console.log("error on workouts");
//     });
// });

// router.put("/api/workouts/:id", function(req, res) {
//   Workout.findByIdAndUpdate( req.params.id, {$push: {exercises: req.body} })
//   .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//       console.log("error on workouts");
//     });
// });

// //updates instances of workouts based on id
// // router.put("/api/workouts/:id", function(req, res) {
// //   console.log(req.params.id);
// // });


// //route to access stats.html
// router.get("/stats", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/stats.html"));
// });

//sets port to lacalhost:3000
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
