const mongoose = require("mongoose");


mongoose.set("strictQuery", false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog;