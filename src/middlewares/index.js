const morganMiddleware = require("./morgan");
const cookieMiddleware = require("./cookieParser");
const bodyMiddleware = require("./bodyParser");
const sessionMiddleware = require("./session");

module.exports = {
  morganMiddleware,
  cookieMiddleware,
  bodyMiddleware,
  sessionMiddleware,
};
