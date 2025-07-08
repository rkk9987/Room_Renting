require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route");
const roomRouter = require("./routes/room.route");
const cors = require("cors");
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.DB_URL)
  .then((res) => {
    // console.log(res.hos);
    console.log("connected db");

    app.listen(process.env.PORT, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("not connected");

    console.log(err);
  });

app.use("/user", userRouter);
app.use("/room", roomRouter);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Route not found" });
});
