const Workout = require("../models/workoutTracker");

module.exports = function (app) {
  app.get("/api/workouts", function (req, res) {
    Workout.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // POST request to save workout exercise
  app.post("/api/workouts", function (req, res) {
    Workout.create({})
      .then((data) => res.json(data))
      .catch((err) => {
        console.log("err", err);
        res.json(err);
      });
  });

  // PUT request to update exercise information by id
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log("err", err);
        res.json(err);
      });
  });

  // GET request to read workout range data from the database
  app.get("/api/workouts/range", (req, res) => {
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