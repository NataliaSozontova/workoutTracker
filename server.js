const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static("seeders"));

// Connecting to mongoDB
// var MONGODB_URI = process.env.MONGODB_URI  ||"mongodb://localhost/myFirstDatabase";
// // 'mongodb://SozNatalie:password123@workouttracker.uo6h4.mongodb.net/tracker?retryWrites=true&w=majority'
// console.log("url is " + MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).catch(function(error){
    console.log("this is error for mongo => " + error);
})

mongoose.connection.on('connected', () =>{
    console.log("Mongoose is connected")
  });
  
// Connecting routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Starts the server and begin listening
app.listen(PORT, () => {
    console.log(`App listening on Port ${PORT}!`);
});
