const express = require("express");
const router = express.Router();

// User dashboard
router.get("/user", (req, res) => {
  res.render("user/dashboard", {
    title: "User Dashboard",
  });
});

// other user routes
// router.get("/user/profile", (req, res) => { ... });

module.exports = router;
