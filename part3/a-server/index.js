const express = require("express");
const app = express();
app.use(express.json());



const PORT = 3001;
app.listen(PORT);
console.log("The server is running", PORT);