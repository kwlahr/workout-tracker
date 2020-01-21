const express = require("express");
const mongoose = require("mongoose");

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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
