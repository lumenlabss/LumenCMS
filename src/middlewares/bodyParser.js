const bodyParser = require("body-parser");

module.exports = {
  urlencoded: bodyParser.urlencoded({ extended: true }),
  json: bodyParser.json(),
};
