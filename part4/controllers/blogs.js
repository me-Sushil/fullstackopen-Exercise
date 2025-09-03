const Blog = require("../models/blog");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response, next) => {
  try {
    const result = await Blog.find({});
    response.json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    if (!title) {
      return response.status(400).json({
        error: "content is missing",
      });
    }
    const blog = new Blog({ title, author, url, likes });

    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
