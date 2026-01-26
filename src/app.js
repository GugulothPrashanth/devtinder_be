const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    console.log("Database Connection Established!!");
    app.listen(7777, () => {
      console.log("Server is Successfully Listening on port 7777....");
    });
  })
  .catch(() => {
    console.log("Database cannot be Connected!!");
  });
