const router = require("express").Router();

const db = require("../models");

module.exports = function (app) {

  //GET request to get all workouts data
  app.get("/api/workouts", function (req, res) {
    console.log("getting workouts");
    db.Workout.find()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  //GET last workout limit to 7
  app.get("/api/workouts/", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" }
        }
      },
    ])
      .then(data => {
        console.log(data)
        res.json(data);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  // POST request to save workout exercise
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });



  // PUT request to update exercise information by id
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Fitness.findByIdAndUpdate(params.id, { $push: { exercises: body } })
      .then((dbData) => {
        res.json(dbData);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // GET request to read workout range data from the database limited to 7
  app.get("/api/workouts/range", (req, res) => {
    console.log("getting workouts data");
    db.Workout.aggregate([
      {
        $limit: 7,
      },
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.json(error);
      });
  });
};