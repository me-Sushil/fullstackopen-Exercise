const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  name: String,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
