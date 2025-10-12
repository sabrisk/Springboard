import { Router } from "express";
import {
	dog_get,
	registered_dog_get,
	adopted_dog_get,
	dog_post,
	adopt_dog_post,
	remove_dog_post,
} from "../controllers/dogController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.get("/dogs", requireAuth, dog_get);
router.get("/dogs/registered", requireAuth, registered_dog_get);
router.get("/dogs/adopted", requireAuth, adopted_dog_get);
router.post("/dogs", requireAuth, dog_post);
router.post("/dogs/:id/adopt", requireAuth, adopt_dog_post);
router.post("/dogs/:id/remove", requireAuth, remove_dog_post);
export default router;
