const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello Hello!");
});

app.use("/test", (req, res) => {
  res.send("Server Server server");
});

app.use("/", (req, res) => {
  res.send("Hello from the Server!");
});

app.listen(7777, () => {
  console.log("Server is Successfully Listening on port 7777....");
});
