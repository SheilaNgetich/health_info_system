import express from "express";
import { enrollPatient} from "../Controllers/enrollmentController.js";

const router = express.Router();

router.post("/enrollment", enrollPatient);

export default router;
