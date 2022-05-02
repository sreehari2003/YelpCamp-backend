const express = require("express");
const camp = require("./routes/camp");
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(morgan("dev"));
app.use(cookieParser());

const bodyParser = require("body-parser");

app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/camp", camp);
app.use("/api/auth", auth);

///global error handler
app.all("*", (req, res, next) => {
  next(new appError(`the requested url ${req.originalUrl} not found`, 404));
});

//accpeting all the errors from next() function

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
