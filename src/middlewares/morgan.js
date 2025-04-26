const config = require("../../config.json");

if (config.NODE_ENV === "development") {
  // In development mode, we log requests
  const morgan = require("morgan");
  module.exports = morgan("dev");
} else {
  // In production mode, no logs
  module.exports = (req, res, next) => {
    next();
  };
}
