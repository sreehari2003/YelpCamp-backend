const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const camp = require("./models/campground");
const morgan = require("morgan");
const cities = require("./seeds/cities");
app.use(express.json());
// console.log(..camp);
app.use(express.urlencoded({ extended: true }));
//VIMP

app.use(morgan("dev"));
dotenv.config({ path: "./config.env" });
//CONNECTING TO MONGOOSE
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
// console.log(DB);
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

//calling importAll
if (process.argv[2] === "--import") {
  importAll();
}

app.get("/", (req, res) => {
  res.render("./campgrounds/index.ejs");
  // views\campgrounds\index.ejs
});
//DUMB AUTHENTICATION

// app.use("/secret", (req, res, next) => {
//   const { password } = req.query;
//   if (process.env.PASSWORD === password) {
//     res.send("hey you are authenticated");
//   }
//   next();
// });

app.use("*", (req, res) => {
  res.send("<h1>404 ERROR</h1>");
});

const PORT = 4000;
app.listen(PORT, () => console.log("app is running"));
