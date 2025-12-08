const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        as: "authored_blogs",
        // attributes: { exclude: ["userId"] },
        attributes: ["id", "author", "title", "url", "likes"],
      },
    });
    if (users) {
      res.json(users);
    }
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//   try {
//     // 1. Fetch user and the associated reading list blogs
//     const user = await User.findByPk(req.params.id, {
//       attributes: ["name", "username"], // Only fetch base user attributes
//       include: [
//         {
//           model: Blog,
//           as: "reading_lists", // Must use the alias from models/index.js
//           // Include the Blog fields required for the final 'readings' array
//           attributes: ["id", "url", "title", "author", "likes", "year"],
//           // Exclude attributes from the join table (like 'read' status)
//           through: {
//             attributes: [],
//           },
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 2. Transform the Sequelize object into the required custom format
//     const userJson = user.toJSON();

//     const response = {
//       name: userJson.name,
//       username: userJson.username,
//       // The blogs are attached under the alias 'reading_lists', rename to 'readings'
//       readings: userJson.reading_lists,
//     };

//     res.json(response);
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // CHANGE: Include the through table attributes (read and id from ReadingList)
    const readingListEntries = await ReadingList.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: Blog,
        attributes: ["id", "url", "title", "author", "likes", "year"],
      },
    });

    // CHANGE: Transform to include readinglists array with read status and junction table id
    const readings = readingListEntries.map((entry) => ({
      id: entry.blog.id,
      url: entry.blog.url,
      title: entry.blog.title,
      author: entry.blog.author,
      likes: entry.blog.likes,
      year: entry.blog.year,
      // NEW: Add readinglists array with read status and junction table id
      readinglists: [
        {
          read: entry.read, // The read status from ReadingList table
          id: entry.id, // The primary key id from ReadingList junction table
        },
      ],
    }));

    res.json({
      name: user.name,
      username: user.username,
      readings: readings,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username }, //body.username
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Update allowed fields
    if (req.body.username) {
      user.username = req.body.username;
    }
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
