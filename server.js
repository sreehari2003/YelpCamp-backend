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

app.use((err, req, res, next) => {
  const code = err.statusCode;
  res.status(code).json({
    ok: false,
    message: "could complete the request",
  });
});

module.exports = app;
