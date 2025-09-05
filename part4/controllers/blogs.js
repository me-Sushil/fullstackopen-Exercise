const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const userExtractor = require("../utils/middleware")

blogRouter.get("/", async (request, response, next) => {
  try {
    const result = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = request.user;
    console.log(user, "user form middleware");
    

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (!blog.user ||blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({
        error: "only the creator can delete this blog",
      });
    }
    await Blog.findByIdAndDelete(id);

    request.user.blogs = request.user.blogs.filter((blog)=> blog.toString() !== id);
    await request.user.save();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    blog.title = title;
    blog.author = author;
    blog.url = url;
    blog.likes = likes;

    const updatedBlog = await blog.save();
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogRouter.post("/", userExtractor, async (request, response, next) => {
  try {
    // const authorization = request.get("authorization");
    // console.log(authorization, "authorization");
    // const authoArr = authorization && authorization.split(" ");

    const user = request.user;
    console.log(user, "user form middleware");

    const decodedToken = jwt.verify(request.token, config.SEKRET);

    console.log(decodedToken, "this is decoded token");

    console.log(request.token, "this is token fron request.token");

    if (!decodedToken) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(decodedToken.id);
    console.log(user, " get user");

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }
    const { title, author, url, likes } = request.body;

    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: user.id,
    });

    const result = await blog.save();
    user.blogs = user.blogs.concat(result.id);
    await user.save();

    if (result) {
      response.status(201).json(result);
      console.log("note saved!");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = blogRouter;
