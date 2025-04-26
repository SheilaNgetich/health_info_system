//importing necessary packages
import express from "express";
import dotenv from "dotenv";

import patientRoutes from "./Routes/patientRoutes.js";
import programRoutes from "./Routes/programRoutes.js";
import enrollmentRoutes from "./Routes/enrollmentRoutes.js";


// dot env config
dotenv.config();
const PORT = process.env.PORT;

//creating an instance of express
const app = express();

//middleware  to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", patientRoutes);
app.use("/api", programRoutes);
app.use("/api", enrollmentRoutes);



//port to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;