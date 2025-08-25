const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to the mongodb");
  })
  .catch((error) => {
    console.log(error, "error to connecting mongodb");
  });

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    minlength:3,
    required:true,
  },
  number: {
    type:String,
    match:[/^\d{2,3}-\d{5,}$/, "Invalid phone number format"],
    required:true,
  }
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
