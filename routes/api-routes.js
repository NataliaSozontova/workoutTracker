const router = require("express").Router();

const Workout = require("../models");

module.exports = function (app) {
  app.get("/api/workouts", function (req, res) {
    console.log("getting workouts");
    Workout.find()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  // POST request to save workout exercise
  app.post("/api/workouts", function (req, res) {
    console.log("posting workouts " + req.body);
    Workout.create({})
      .then((data) => res.json(data))
      .catch((err) => {
        console.log("err", err);
        res.status(400).json(err);
      });
  });

  // PUT request to update exercise information by id
   app.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                exercises: req.body
            }
        })
        .then((dbWorkout) => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});
  
  // app.put("/api/workouts/:id", ({ body, params }, res) => {
  //   console.log("getting workouts by id");
  //   Workout.findByIdAndUpdate(
  //     params.id,
  //     { $push: { exercises: body } },
  //     { new: true, runValidators: true }
  //   )
  //     .then((data) => res.json(data))
  //     .catch((err) => {
  //       console.log("err", err);
  //       res.json(err);
  //     });
  // });

  // GET request to read workout range data from the database
  app.get("/api/workouts/range", (req, res) => {
    console.log("getting workouts data");
    Workout.aggregate([
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