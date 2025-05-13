const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
  res.render("theme/default/home.ejs", {});
});

module.exports = router;
