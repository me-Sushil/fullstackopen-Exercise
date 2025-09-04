const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
