import { Router } from "express";
import {
	signup_post,
	login_post,
	logout_get,
} from "../controllers/authController.js";
const router = Router();

router.post("/signup", signup_post); // good
router.post("/login", login_post); // good
router.get("/logout", logout_get);
export default router;
