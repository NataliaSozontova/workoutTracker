const path = require("path");

module.exports = (app) => {
  // GET request navigate to exercise.html page when user hits '/exercise' url
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  // GET request navigate to the home - index.html page when user hits '/' url
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  // GET request navigate to stats.html page when user hits '/stats' url
  app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};