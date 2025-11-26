const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const middleWare = require("./utils/middleware");
const loginRouter = require("./controllers/login");

app.use(express.json());
app.use(cors());

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Error on connection database");
  });
app.use(middleWare.tokenExtractor);
app.use(middleWare.requestLogger);
app.use("/api/blogs", middleWare.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleWare.errorhandler);
app.use(middleWare.unknownEndpoint);

module.exports = app;
