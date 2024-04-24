import express from "express";

import schemasRouter from "./routes/schemas"
import dataRouter from "./routes/data"

const router = express.Router();

router.use("/schemas", schemasRouter);
router.use("/data", dataRouter);

export default router;
