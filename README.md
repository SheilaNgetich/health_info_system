# Health Information System (HIS)

Welcome to the **Health Information System (HIS)**! This is a web-based system designed to manage patient records, enrollment in health programs, and program details. The system allows administrators to manage patients and their program enrollments, while offering a seamless experience for users to interact with the system through a backend API.

---

## Features

- **Patient Management**: Store and retrieve patient details (name, phone number).
- **Program Enrollment**: Enroll patients in different health programs.
- **Program Management**: Manage available programs within the system.
- **Patient Profile**: View patient details including the programs they are enrolled in.
- **API for Interaction**: Interact with the system through RESTful API endpoints for easy integration.

---

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Database Schema](#database-schema)
6. [Testing](#testing)
7. [Contributing](#contributing)
8. [License](#license)

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **API Testing**: Mocha, Chai
- **Version Control**: Git, GitHub

---

## Installation

To set up the Health Information System locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/SheilaNgetich/health_info_system.git
```
2. Navigate to the project folder
```bash
cd health_info_system
```
3. Install dependencies
Ensure you have Node.js installed. Then, install the necessary packages with the following command:
```bash
npm install
```
4. Configure the database
Create a .env file in the root directory and add your MySQL database configuration:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=health_info_system
```
6. Create the database schema
Run the SQL scripts or use an admin tool like MySQL Workbench to create the necessary tables in the database. Ensure the tables include patients, enrollments, and programs.

---

### Usage
Start the server:

```bash
npm start
```

The server will now be running at http://localhost:3000 by default.

---

### API Endpoints

Below are the key API endpoints for interacting with the Health Information System:

1. GET /patients/:id
Description: Retrieve patient details by patient ID.

Response: Patient's name, phone number, and the programs they are enrolled in.

Example:
```bash
{
  "name": "John Doe",
  "phone_no": "123-456-7890",
  "programs": ["Program A", "Program B"]
}
```

2. POST /patients

Description: Add a new patient to the system.
```bash
{
  "name": "John Doe",
  "phone_no": "123-456-7890"
}
```
Response: Success message upon patient creation.

4. POST /enrollment
Description: Enroll a patient into a program.

Request body:
```bash
{
  "program_id": 1,
  "patient_id": 123
}
```
Response: Success message when you enroll.

4. GET /programs
Description: Retrieve all available programs in the system.

Response:
```bash
[
  {
    "program_id": 1,
    "name": "Program A"
  },
  {
    "program_id": 2,
    "name": "Program B"
  }
]
```

---

### Database Schema

1. Patients Table
Stores patient information.

``` bash 
Column	Type	Description
patients_id	INT	Primary key, auto-incrementing
name	VARCHAR(255)	Patient's full name
phone_no	VARCHAR(15)	Patient's phone number

```

2. Programs Table
Stores program information.

``` bash
Column	Type	Description
program_id	INT	Primary key, auto-incrementing
name	VARCHAR(255)	Name of the program

```

3. Enrollment Table
Stores patient-program enrollment relationships.

``` bash
Column	Type	Description
program_id	INT	Foreign key from programs
patients_id	INT	Foreign key from patients

```

---


### Testing
This project uses Mocha and Chai for unit testing.

Running Tests
To run tests, use the following command:

```bash
npm test
```

### Contributing
- Fork the repository.

- Create a new branch (```bash git checkout -b feature/your-feature```).

- Make your changes.

- Commit your changes (```bash git commit -am 'Add new feature'```).

- Push to the branch (```bash git push origin feature/your-feature```).

- Create a new Pull Request.

---

### License
This project is licensed under the MIT License - see the LICENSE file for details.

---

### Acknowledgments
- Node.js and Express for powering the backend.

- MySQL for database management.

- Mocha and Chai for testing.

- Everyone who contributes to open-source projects!

