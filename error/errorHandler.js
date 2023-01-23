const errorHandler = (err, req, res, next) => {
  // 0 - Message simple
  // 1 - Message sans error
  // 2 - Toutes les infos
  const debugLevel = 1;
  message = {};
  switch (debugLevel) {
    case 0:
      error = err.message;
      if (err.name == "SequelizeDatabaseError") {
        message = "Database Error";
      }
      break;
    case 1:
      error = { message: err.message };
      console.log("err.message", err.message);
      break;
    case 2:
      error = err;
      break;
    default:
      console.log("Bad debugLevel");
  }
  // console.log("ErrorHandler", error);
  return res.status(err.statusCode || 500).json({ error });
};

module.exports = errorHandler;
