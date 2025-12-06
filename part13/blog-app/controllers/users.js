const router = require("express").Router();

const { User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.json(users);
    }
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
    where: { username: req.params.username }
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
