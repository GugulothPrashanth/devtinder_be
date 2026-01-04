const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://prashanth:Vsgk1Q9DxJ6zJZaq@devtinder.ew4hsfs.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
