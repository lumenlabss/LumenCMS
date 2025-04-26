const express = require("express");
const router = express.Router();

// Admin dashboard
router.get("/admin", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
  });
});

// Other admin routes here
// router.get("/admin/settings", (req, res) => { ... });

module.exports = router;
