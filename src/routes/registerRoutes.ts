import { Router } from "express";
import { registerPage, registerUser } from "../services/authService";

const router = Router();

router.get("/register", registerPage);
router.post("/register", registerUser);

export default router;
