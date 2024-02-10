require("dotenv").config();
const express = require("express");
const app = express();
const PORT = Number(process.env.PORT);
const indexRouter = require("./routes");
const mongoose = require("mongoose");
const morgan = require("morgan");
app.use(morgan("dev"));
app.use(express.json());
mongoose.connect(process.env.DB).then(() => console.log("Connected!"));
app.use((err, req, res, next) => {
  err = err ? err.toString() : "somthing is missing";
  res.status(500).json({ msg: err });
});
app.listen(PORT, () => {
  console.log("app is runing");
});
