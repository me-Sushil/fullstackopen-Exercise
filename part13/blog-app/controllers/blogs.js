const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const { Blog, User } = require("../models");
const { Op } = require("sequelize");

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      where[Op.or] = [
        {
          title: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
        {
          author: {
            [Op.iLike]: `%${req.query.search}%`,
          },
        },
      ];
    }
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["id", "name", "username"],
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization, "this is authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    console.log(req.decodedToken.id, "this is id from header");
    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: error.errors[0].message });
    }
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    console.log(blog.id, "the Blog creater userid");
    console.log(req.decodedToken.id, "the user userid");

    // Check if the blog belongs to the logged-in user
    if (blog.userId !== req.decodedToken.id) {
      return res
        .status(403)
        .json({ error: "Only the blog creator can delete this blog" });
    }

    await blog.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (blog) {
      blog.likes = req.body.likes;
      await blog.save();
      res.json(blog);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
