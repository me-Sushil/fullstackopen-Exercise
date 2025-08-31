const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const middleWare = require("./utils/middleware");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(config.MONGODB_URI);

app.use(middleWare.requestLogger);
app.use("/api/blogs", blogRouter);
app.use(middleWare.errorhandler);
app.use(middleWare.unknownEndpoint);

module.exports = app;