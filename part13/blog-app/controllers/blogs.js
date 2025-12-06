const router = require("express").Router();

const { Blog } = require("../models");

router.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/api/blogs", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});

router.delete("/api/blogs/:id", async (req, res) => {
  const deleted = await Blog.destroy({
    where: { id: req.params.id },
  });
  if (!deleted) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(204).end();
});

module.exports = router;
