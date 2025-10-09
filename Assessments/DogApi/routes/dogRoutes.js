import { Router } from "express";
import {
	dog_get,
	dog_post,
	adopt_dog_post,
} from "../controllers/dogController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/dogs", requireAuth, dog_get);
router.post("/dogs", requireAuth, dog_post);
router.post("/dogs/:id/adopt", requireAuth, adopt_dog_post);
export default router;

console.log("dogRoutes");
