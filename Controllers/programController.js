import db from "../Database/db.js";

// Create a program
export const createProgram = (req, res) => {
    //getting the program name from the req body
    const { program } = req.body;
  
    //data validation
    if (!program) {
      return res.status(400).json({ message: "Kindly insert a program name" });
    }
    //SQL query to create a health program
    const sql = "INSERT INTO programs (program) VALUES (?)";
    const values = program;
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error while inserting program", err);
        return res.status(500).json({
          message: "A problem has been encountered while inserting the program",
        });
      }
  
      res.status(201).json({ message: "Program created successfully" });
    });
  };

  // Get all programs
export const getAllPrograms = (req, res) => {
    const sql = "SELECT * FROM programs";
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching programs", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json(results);
    });
  };