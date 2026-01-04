const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully!");
  } catch (error) {
    res.status(400).send("Error Saving the User!" + error.message);
  }
});

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
