const connectDB = require("./config/database");
const app = require("./app");

const port = process.env.PORT || 8000;
connectDB().then(() => {
  // Starting server
  app.listen(port, () => {
    console.log(`App listening on port ${port}`.white.underline);
  });
});
