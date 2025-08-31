const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const url = process.env.MONGODB_URI;
require("dotenv").config();

app.use(express.json());
app.use(cors());




const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(url)


app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


app.listen(process.env.PORT, () => {
  console.log(`The server is running on PORT ${process.env.PORT}`);
});
