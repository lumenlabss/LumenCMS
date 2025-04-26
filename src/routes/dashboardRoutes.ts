import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("user/dashboard", { user: req.session.user });
});

export default router;
