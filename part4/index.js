const app = require("./app");



app.listen(process.env.PORT, () => {
  console.log(`The server is running on PORT ${process.env.PORT}`);
});
