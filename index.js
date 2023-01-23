const express = require("express");
const errorHandler = require("./error/errorHandler");
const { RequestError } = require("./error/customError");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const company_router = require("./routes/company");
const PORT = process.env.SERVER_PORT || 3000;

// available route
app.use("/api/company", company_router);

// catch other routes
app.use("*", (req, res) => {
  throw new RequestError("Route/Verb does not exist");
});

// start server
app.listen(PORT, () => {
  try {
    console.log(`🍋 This server is running on port ${PORT} 🍋`);
  } catch (error) {
    console.log(error);
  }
});

// catch errors
app.use(errorHandler);

module.exports = app;
