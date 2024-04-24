import express from "express";
import asyncHandler from "express-async-handler";

import * as dataController from "../controllers/dataController"

const router = express.Router();

router.post("/", asyncHandler(dataController.generateEphemeral));
router.get("/", asyncHandler(dataController.generateObjects));
router.get("/values", asyncHandler(dataController.generateValues))

export default router;
