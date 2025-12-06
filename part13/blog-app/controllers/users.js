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

module.exports = router;