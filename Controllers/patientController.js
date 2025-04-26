import db from "../Database/db.js";

// Registering a patient
export const createPatient = (req, res) => {
  //getting the program name from the req body
  const { name, phone_no } = req.body;

  //data validation
  if (!name || !phone_no) {
    return res.status(400).json({ message: "Kindly insert patient details" });
  }

  //SQL query to register a patient
  const sql = "INSERT INTO patients (name, phone_no) VALUES (?,?)";
  const values = [name, phone_no];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error while inserting patient", err);
      return res.status(500).json({
        message: "A problem has been encountered while adding a patient",
      });
    }

    // Return the ID of the newly created patient
    res.status(201).json({ 
      message: "Patient added successfully",
      patientId: result.insertId 
    });
  });
};

// Get all patients
export const getAllPatients = (req, res) => {
  // SQL query to fetch a list of patients
  const sql = "SELECT * FROM patients";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error getting patient details", err);
      return res.status(500).json({
        message:
          "A problem has been encountered while viewing a patient's details",
      });
    }

    res.status(200).json(results);
  });
};

// Get one patient
export const getPatientById = (req, res) => {
  //getting the patients id from the request params
  const patientId = req.params.id;
  // SQL query to fetch patient details
  const sql = "SELECT * FROM patients WHERE patients_id =? ";
  db.query(sql, [patientId], (err, result) => {
    if (err) {
      console.error("Error getting patient details", err);
      return res.status(500).json({
        message:
          "A problem has been encountered while viewing a patient's details",
      });
    }
    //checking if the patient exists
    if (result.length === 0) {
      return res.status(404).json({ message: "No such patient exists" });
    }

    //returning patient details
    const patientDetails = result[0];
    res.status(200).json({
      //taking the first rows name and phone number
      name: patientDetails.name,
      phone_no: patientDetails.phone_no,
    });
  });
};

// Update a patient
export const updatePatient = (req, res) => {
  //getting the patients id from the request params
  const patientId = req.params.id;
  //getting the updated patient details from the req body
  const { name, phone_no } = req.body;

  // SQL query to update patient details
  let sql = "UPDATE patients SET ";
  let values = [];

  // Dynamically adding values to update based on the ones provided
  if (name !== undefined) {
    //checking whether its undefined not null
    if (name === null) {
      sql += "name = NULL, "; // Handle NULL for name explicitly
    } else {
      sql += "name = ?, ";
      values.push(name);
    }
  }
  if (phone_no !== undefined) {
    //checking whether its undefined not null
    if (phone_no === null) {
      sql += "phone_no = NULL, "; // Handle NULL for phone_no explicitly
    } else {
      sql += "phone_no = ?, ";
      values.push(phone_no);
    }
  }

  // Removing the last comma and trailing space from the SQL query
  if (sql.endsWith(', ')) {
    sql = sql.slice(0, -2);
  }

  sql += " WHERE patients_id = ?";
  values.push(patientId);

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error updating patient details", err);
      return res.status(500).json({
        message:
          "A problem has been encountered while updating the  patient's details",
      });
    }

    // Check if a patient details have been updated
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient details updated successfully" });
  });
};

//viewing a patient's profile
export const getPatientProfile = (req, res) => {
  //getting the patients id from the request params
  const patient_id = req.params.id;

  // SQL query to fetch patient details and programs
  const sql = `
      SELECT p.name, p.phone_no ,programs.name AS program_name
      FROM patients AS p
      JOIN enrollment ON enrollment.patients_id = p.patients_id
      JOIN programs ON enrollment.program_id = programs.program_id
      WHERE p.patients_id = ?
    `;

  db.query(sql, [patient_id], (err, result) => {
    if (err) {
      console.error("Error getting patient's profile", err);
      return res.status(500).json({
        message:
          "A problem has been encountered while viewing a patient's profile",
      });
    }
    //checking if the patient exists
    if (result.length === 0) {
      return res.status(400).json({ message: "No such patient exists" });
    }

    //returning patient details
    const patientDetails = result[0];
    res.status(200).json({
      //taking the first rows name and phone number
      name: patientDetails.name,
      phone_no: patientDetails.phone_no,
      //returning all the programs a patient
      //is enrolled in
      programs: result.map((resultRow) => resultRow.program_name),
    });
  });
};

// Delete a patient
export const deletePatient = (req, res) => {
  const patientId = req.params.id;
  
  // SQL query to delete from enrollment table first 
  const enrollmentSql = "DELETE FROM enrollment WHERE patients_id = ?";

  db.query(enrollmentSql, [patientId], (enrollErr, enrollResult) => {
    //SQL query to delete patient
    const patientSql = "DELETE FROM patients WHERE patients_id = ?";
    db.query(patientSql, [patientId], (err, results) => {
      if (err) {
        console.error("Error deleting patient", err);
        return res.status(500).json({
          message: "A problem has been encountered while deleting the patient's details"
        });
      } 
      // Checking if a patient has been deleted
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Patient not found" });
      }
 
      res.status(200).json({ message: "Patient deleted successfully" });
    });
  });
};