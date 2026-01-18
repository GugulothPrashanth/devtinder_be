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

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
  } catch (error) {
    res.status(400).send("Error Saving the User!" + error.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error Saving the User!" + error.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const userById = await User.findByIdAndDelete({ _id: userId });
    res.send("User Deleted Successfully!");
  } catch (error) {
    res.status(400).send("Error Saving the User!" + error.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed!");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("user Updated Successfully!");
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
