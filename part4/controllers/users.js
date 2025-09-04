const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, password, name } = request.body;

    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    console.log(passwordHash, " password hash");
    const user = new User({ username, passwordHash, name });

    const savedUser = await user.save();

    response.status(201).json(savedUser);

    console.log(savedUser, "this is saved user");
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;