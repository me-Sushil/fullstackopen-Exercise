const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const { userExtractor, tokenExtractor } = require("../utils/middleware");

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

blogRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user;
      if (!user) {
        return response.status(401).json({ error: "token missing or invalid" });
      }

      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        return response.status(404).json({ error: "blog not found" });
      }

      // Check if the logged-in user is the creator of the blog
      if (blog.user.toString() !== user.id.toString()) {
        return response
          .status(401)
          .json({ error: "only the creator can delete this blog" });
      }

      // Delete the blog
      await Blog.findByIdAndDelete(request.params.id);
      user.blogs = user.blogs.filter(
        (b) => b.toString() !== blog.id.toString()
      );
      await user.save();
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

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
// }tokenExtractor, userExtractor,

blogRouter.post("/", async (request, response, next) => {
  try {
    const authorization = request.get("authorization");
    console.log(authorization, "this is token from request");

    const authoArr = authorization && authorization.split(" ");

    const decodedToken = jwt.verify(authoArr[1], config.SEKRET);
    console.log(decodedToken, "this is decoded token");

    if (!decodedToken) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const { title, author, url, likes } = request.body;
    const user = await User.findById(decodedToken.id);
    console.log(user, " get by decoded token");

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    });

    const saved = await blog.save();
    user.blogs = user.blogs.concat(saved._id);
    await user.save();

    response.status(201).json(saved);
  } catch (error) {
    next(error);
  }
});
module.exports = blogRouter;
