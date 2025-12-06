const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(204).end();
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
