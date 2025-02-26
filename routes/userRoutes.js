import { Router } from "express";
import {
  authentication,
  signup,
  updatePassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/auth/login", authentication);
router.post("/auth/signup", signup);
router.put("/auth/password", authMiddleware, updatePassword);

export default router;
