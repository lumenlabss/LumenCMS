import { Router } from "express";
import { loginPage, loginUser } from "../services/authService";

const router = Router();

router.get("/login", loginPage);
router.post("/login", loginUser);

export default router;
