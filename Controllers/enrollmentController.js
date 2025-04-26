import db from "../Database/db.js";

// Enroll a patient
export const enrollPatient = (req, res) => {
  const { program_id, patients_id } = req.body;

  // Check if the necessary data is provided
  if (!program_id || !patients_id) {
    return res
      .status(400)
      .json({ message: "Kindly insert enrollment details (program_id, patients_id)" });
  }

  // First, check if the patient exists
  const checkPatientSql = "SELECT * FROM patients WHERE patients_id = ?";
  db.query(checkPatientSql, [patients_id], (err, patientResults) => {
    if (err) {
      console.error("Error checking patient existence:", err);
      return res.status(500).json({
        message: "A problem has been encountered while checking patient existence",
      });
    }

    if (patientResults.length === 0) {
      console.log(`Patient with ID ${patients_id} not found.`);
      return res.status(404).json({ message: "Patient not found" });
    }

    // Now check if the program exists (to avoid enrolling into a non-existent program)
    const checkProgramSql = "SELECT * FROM programs WHERE program_id = ?";
    db.query(checkProgramSql, [program_id], (err, programResults) => {
      if (err) {
        console.error("Error checking program existence:", err);
        return res.status(500).json({
          message: "A problem has been encountered while checking program existence",
        });
      }

      if (programResults.length === 0) {
        console.log(`Program with ID ${program_id} not found.`);
        return res.status(404).json({ message: "Program not found" });
      }

      // If both the patient and program exist, proceed with enrollment
      const enrollSql = "INSERT INTO enrollment (program_id, patients_id) VALUES (?, ?)";
      const values = [program_id, patients_id];

      db.query(enrollSql, values, (err, result) => {
        if (err) {
          console.error("Error enrolling patient:", err);
          return res.status(500).json({
            message: "A problem has been encountered while enrolling a patient",
          });
        }

        console.log(`Patient with ID ${patients_id} enrolled in program ${program_id}`);
        res.status(201).json({ message: "Patient enrolled successfully" });
      });
    });
  });
};
