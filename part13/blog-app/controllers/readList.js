const express = require("express");
const router = express.Router();
const { Blog, ReadingList } = require("../models");
const { tokenExtractor } = require("../util/middleware");

// Add a blog to reading list (unread by default)
router.post("/", tokenExtractor, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.body.blogId);

    if (!blog) {
      return res.status(404).json({ error: "blog not found" });
    }

    // Check if already in reading list
    const existing = await ReadingList.findOne({
      where: {
        userId: req.decodedToken.id,
        blogId: blog.id,
      },
    });

    if (existing) {
      return res.status(400).json({ error: "blog already in reading list" });
    }

    await ReadingList.create({
      userId: req.decodedToken.id,
      blogId: blog.id,
      read: false,
    });

    res.status(201).json({
      message: "blog added to reading list",
      blogId: blog.id,
      title: blog.title,
      read: false,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
