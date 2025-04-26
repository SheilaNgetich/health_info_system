import express from "express";

import {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  getPatientProfile,
  deletePatient
} from "../Controllers/patientController.js";

const router = express.Router();

// Routes
router.post("/patients", createPatient);
router.get("/patients", getAllPatients);
router.get("/patients/:id", getPatientById);
router.patch("/patients/:id", updatePatient);
router.delete("/patients/:id", deletePatient);


export default router;
