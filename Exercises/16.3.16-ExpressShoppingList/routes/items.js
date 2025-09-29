"use strict";

import express from "express";
import {
	getItemsHandler,
	postItemsHandler,
	getItemHandler,
	patchItemHandler,
	deleteItemHandler,
} from "../handlers.js";

let router = express.Router();

router.route("").get(getItemsHandler).post(postItemsHandler);
router
	.route("/:name")
	.get(getItemHandler)
	.patch(patchItemHandler)
	.delete(deleteItemHandler);

export default router;
