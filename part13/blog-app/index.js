const express = require("express");
const app = express();
app.use(express.json());

const middleware = require("./util/middleware");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readRouter = require("./controllers/readList");

app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readRouter);

app.use(middleware.errorhandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
