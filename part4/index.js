const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


app.listen(process.env.PORT, () => {
  console.log(`The server is running on PORT ${process.env.PORT}`);
});
