const Blog = require("../models/blog");
const blogRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const { error } = require("../utils/logger");

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

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const id = request.body.id;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return response.status(404).json({ error: "blog not found" });
    }

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

blogRouter.post("/", async (request, response, next) => {
  try {

    const authorization = request.get("authorization");
    console.log(authorization, "authorization");

    const authoArr = authorization && authorization.split(" ");
    const decodedToken = jwt.verify(authoArr[1], config.SEKRET);

    if(!decodedToken){
      return response.status(401).json({error:"Unauthorized"});
    }
    
    const user = await User.findById(decodedToken.id);
    console.log(user, " get user");

    if (!user) {
      return response
        .status(400)
        .json({ error: "userId missing or not valid" });
    }
    const { title, author, url, likes} = request.body;


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
