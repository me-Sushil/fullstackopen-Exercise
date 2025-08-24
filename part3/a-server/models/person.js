const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(url)