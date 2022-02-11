const express = require("express");
const camp = require("./routes/camp");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));

const bodyParser = require("body-parser");

app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api", camp);
console.log("reached server");

app.use((err, req, res, next) => {
  const code = err.statusCode;
  res.send(code);
});
module.exports = app;
