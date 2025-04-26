import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.use(chaiHttp);
const { expect } = chai;

let patientId; // storing patientId 
let programId; // storing program_id

// create a new patient and save their ID 
before(async function() {
  try {
    // Create patient
    const patientRes = await chai.request(app)
      .post('/api/patients')
      .send({ name: "Alice Wanjiru", phone_no: "0712345678" });
    
    expect(patientRes).to.have.status(201);
    console.log("Patient creation response:", patientRes.body);
    
    //request to get all patients to access the patientid
    const getAllRes = await chai.request(app)
      .get('/api/patients');
    
    expect(getAllRes).to.have.status(200);
    // Finding the patient we just created
    const createdPatient = getAllRes.body.find(p => p.name === "Alice Wanjiru");
    //setting the patientId value
    patientId = createdPatient.patients_id;
    console.log("Set patientId to:", patientId);

    // Create program
    const programRes = await chai.request(app)
      .post('/api/programs')
      .send({ program: "TB" });
    
    expect(programRes).to.have.status(201);
    
    // Get all programs to find the ID
    const getAllPrograms = await chai.request(app)
      .get('/api/programs');
    
    expect(getAllPrograms).to.have.status(200);
    // Find the program we just created
    const createdProgram = getAllPrograms.body.find(p => p.program === "TB");
    //setting the programId value
    programId = createdProgram.program_id;
    console.log("Set programId to:", programId);
  } catch (err) {
    console.error("Setup error:", err);
    throw err;
  }
});

// testing patient routes
describe('Patient Routes', () => {
  // test for creating a patient
  describe('POST /patients', () => {
    it('should create a new patient', (done) => {
      chai.request(app)
        .post('/api/patients')
        .send({
          name: "New Patient",
          phone_no: "0700000000"
        })
        .end((err, res) => {
          expect(res).to.have.status(201); 
          expect(res.body).to.be.an('object');
          done(); 
        });
    });
  });

  // test for getting all patients
  describe('GET /patients', () => {
    it('should return a list of patients', (done) => {
      chai.request(app)
        .get('/api/patients')
        .end((err, res) => {
          expect(res).to.have.status(200); 
          expect(res.body).to.be.an('array');
          done(); 
        });
    });
  });

  // test for getting a specific patient
  describe('GET /patients/:id', () => {
    it('should get a patient by id', (done) => {
      console.log("Getting patient with ID:", patientId);
      chai.request(app)
        .get(`/api/patients/${patientId}`)
        .end((err, res) => {
          expect(res).to.have.status(200); 
          expect(res.body).to.be.an('object');
          done(); 
        });
    });
  });

  // test for updating a specific patient
  describe('PATCH /patients/:id', () => {
    it('should update patient details', (done) => {
      console.log("Updating patient with ID:", patientId);
      chai.request(app)
        .patch(`/api/patients/${patientId}`) 
        .send({ name: "Alice Updated" })
        .end((err, res) => {
          expect(res).to.have.status(200); 
          expect(res.body).to.be.an('object'); 
          done(); 
        });
    });
  });
});

//testing program routes
describe('Program Routes',()=>{
    //test for creating a program
    describe('POST /programs', () => {
        it('should create a new program', (done) => {
          chai.request(app)
            .post('/api/programs')
            .send({
              program: "TB"
            })
            .end((err, res) => {
              expect(res).to.have.status(201); 
              expect(res.body).to.be.an('object');
              done(); 
            });
        });
      });

    // test for getting all programs
    describe('GET /programs', () => {
        it('should return a list of programs', (done) => {
          chai.request(app)
            .get('/api/programs')
            .end((err, res) => {
              expect(res).to.have.status(200); 
              expect(res.body).to.be.an('array');
              done(); 
            });
        });
      });
});

//testing enrollment route
describe('Enrollment Routes', ()=>{
    //test for enrolling a patient
    describe('POST /enrollment', () => {
        it('should enroll a patient', (done) => {
          console.log('Before enrollment test - patientId:', patientId, 'programId:', programId);
          chai.request(app)
            .post('/api/enrollment')
            .send({
                program_id: programId,  
                patients_id: patientId,
            })
            .end((err, res) => {
              expect(res).to.have.status(201); 
              expect(res.body.message).to.equal('Patient enrolled successfully');
              expect(res.body).to.be.an('object');
              done(); 
            });
        });
      });
});

// test for deleting a specific patient - moved to the end so enrollment can work
describe('Patient Deletion', () => {
  describe('DELETE /patients/:id', () => {
    it('should delete a patient', (done) => {
      console.log("Deleting patient with ID:", patientId);
      chai.request(app)
        .delete(`/api/patients/${patientId}`) 
        .end((err, res) => {
          expect(res).to.have.status(200); 
          expect(res.body).to.be.an('object');
          done(); 
        });
    });
  });
});