const express = require("express");
const router = express.Router();
const { Blog, User, ReadingList } = require("../models");
const { tokenExtractor } = require("../util/middleware");

// Add a blog to reading list (unread by default
router.post("/", async (req, res, next) => {
  try {
    // CHANGE: Accept blog_id and user_id from request body (not from token)
    const { blog_id, user_id } = req.body;

    const blog = await Blog.findByPk(blog_id);
    const user = await User.findByPk(user_id);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Check if already in reading list
    const existing = await ReadingList.findOne({
      where: {
        userId: user_id,
        blogId: blog_id,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "blog already in reading list" });
    }

    // Create with read: false (unread by default)
    await ReadingList.create({
      userId: user_id,
      blogId: blog_id,
      read: false,
    });

    res.status(201).json({
      message: "blog added to reading list",
      blogId: blog_id,
      userId: user_id,
    });
  } catch (error) {
    next(error);
  }
});

// Get user's reading list
router.get("/", tokenExtractor, async (req, res) => {
  try {
    const readingList = await ReadingList.findAll({
      where: {
        userId: req.decodedToken.id,
      },
      include: {
        model: Blog,
        attributes: ["id", "author", "url", "title", "likes"],
      },
    });

    if (!readingList) {
      return res.status(404).json({ error: "reading list not found" });
    }

    res.json(readingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark a blog as read/unread in reading list
router.put("/:blogId", tokenExtractor, async (req, res) => {
  try {
    const readingListEntry = await ReadingList.findOne({
      where: {
        userId: req.decodedToken.id,
        blogId: req.params.blogId,
      },
    });

    if (!readingListEntry) {
      return res.status(404).json({ error: "blog not in reading list" });
    }

    readingListEntry.read = req.body.read;
    await readingListEntry.save();

    const blog = await Blog.findByPk(req.params.blogId);

    res.json({
      blogId: blog.id,
      title: blog.title,
      read: readingListEntry.read,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove blog from reading list
router.delete("/:blogId", tokenExtractor, async (req, res) => {
  try {
    const readingListEntry = await ReadingList.findOne({
      where: {
        userId: req.decodedToken.id,
        blogId: req.params.blogId,
      },
    });

    if (!readingListEntry) {
      return res.status(404).json({ error: "blog not in reading list" });
    }

    await readingListEntry.destroy();

    res.json({ message: "blog removed from reading list" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
