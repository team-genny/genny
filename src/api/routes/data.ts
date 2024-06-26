import express from "express";
import asyncHandler from "express-async-handler";

import * as dataController from "../controllers/dataController"

const router = express.Router();

router.post("/", asyncHandler(dataController.generateEphemeral));
router.get("/", asyncHandler(dataController.readAll));
router.get("/objects", asyncHandler(dataController.generateObjects));
router.get("/values", asyncHandler(dataController.generateValues));
router.post ("/persistent", asyncHandler(dataController.generatePersistentData));
router.get("/:idOrSlug",asyncHandler(dataController.readByIdOrSlug))
export default router;
