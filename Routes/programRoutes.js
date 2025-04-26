import express from "express";

import { createProgram, getAllPrograms } from "../Controllers/programController.js";

const router = express.Router();

router.post("/programs", createProgram);
router.get("/programs", getAllPrograms);

export default router;