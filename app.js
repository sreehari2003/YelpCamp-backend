const app = require("./server");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const camp = require("./models/campground");
const cities = require("./seeds/cities");

app.use(express.json());
// console.log(..camp);
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

//VIMP

dotenv.config({ path: "./config.env" });
//CONNECTING TO MONGOOSE
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log("connected to mongodb");
  })
  .catch((er) => {
    console.log(er);
    console.log("error connecting to mongodb");
  });

//deleting all the files
const deleteAll = async () => {
  try {
    await camp.deleteMany();
    console.log("deleted all");
  } catch {
    console.log("error deleting all");
  }
};
//calling the delete
if (process.argv[2] === "--delete") {
  deleteAll();
}

//importing the cities files
const importAll = async () => {
  try {
    await camp.create(cities);
    console.log("cities created");
  } catch (e) {
    console.log(e);
    console.log("error creating cities");
  }
};
app.get("/", (req, res) => {
  res.send(
    "<div style='height:100vh; display:grid; place-items:center;>\n<h1 style='color:red; font-size:100px; '>YELP CAMP</h1></div>"
  );
});
//calling importAll
if (process.argv[2] === "--import") {
  importAll();
}
const PORT = 4000;
app.listen(PORT, () => console.log("app is running"));

module.exports = app;
