import express from "express";
import asyncHandler from "express-async-handler";

import * as schemaController from "../controllers/schemaController";

const router = express.Router();

router.get("/", asyncHandler(schemaController.readAll));
router.get("/:id", asyncHandler(schemaController.readById));
router.post("/", asyncHandler(schemaController.create));
router.delete("/:id", asyncHandler(schemaController.deleteByIdOrSlug));
router.patch("/:id", asyncHandler(schemaController.updateByIdOrSlug));
export default router;
