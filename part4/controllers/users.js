const { response } = require("../app");
const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    console.log(password, " this is password");
    // if(!(username && password)){
    //     return response.status(400).json({error: "Invalid username and password"});
    // }
    if (!username || username.length < 3) {
      return response
        .status(400)
        .json({ error: "Username must be at least 3 characters long" });
    }

    if (!password || password.length < 3) {
      return response
        .status(400)
        .json({ error: "Password must be at least 3 characters long" });
    }

    const isExist = await User.findOne({ username });
    if (isExist) {
      return response.status(400).json({ error: "username must be unique" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log(passwordHash, " password hash");
    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();

    response.status(201).json(savedUser);

    console.log(savedUser, "this is saved user");
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (request, response, next) => {
  try {
    const result = await User.find({});

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
module.exports = userRouter;
