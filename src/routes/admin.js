const express = require("express");
const router = express.Router();

// Admin dashboard
router.get("/admin", (req, res) => {
  res.render("admin/dashboard", {
    title: "Admin Dashboard",
  });
});

// other admin route
// router.get("/admin/settings", (req, res) => { ... });

module.exports = router;
