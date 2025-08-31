const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch((error) => next(error));
});

blogRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blog = new Blog({ title, author, url, likes });

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
