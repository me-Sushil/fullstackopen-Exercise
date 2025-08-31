require("dotenv").config();
const app = require("./app");
const config = require("./utils/config");



app.listen(config.PORT, () => {
  console.log(`The server is running on PORT ${config.PORT}`);
});
