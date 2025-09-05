const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../utils/config");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  console.log(user, "user");

  const isValidPassword =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(isValidPassword && user)) {
    return response
      .status(401)
      .json({ error: "Invalide username or password" });
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SEKRET)
  console.log(token);

  response.status(200).json({token:token, username:user.username, name:user.name});
});

module.exports = loginRouter;
