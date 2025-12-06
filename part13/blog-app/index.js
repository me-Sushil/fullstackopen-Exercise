const express = require("express");
const app = express();
app.use(express.json());

const middleware = require("./util/middleware");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const blogsRouter = require("./controllers/blogs");

app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.use(middleware.errorhandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
