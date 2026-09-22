# RESTful Student API

A simple REST API built with Node.js, Express, and MongoDB for managing students.

## Requirements

- Node.js
- MongoDB

## Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://127.0.0.1:27017/studentsdb
PORT=5000
```

Start the server:

```bash
npm start
```

The API runs at `http://localhost:5000` by default.

## API Endpoints

Base URL: `http://localhost:5000/api/students`

### Get all students

```http
GET /api/students
```

### Create one student

```http
POST /api/students
Content-Type: application/json
```

```json
{
  "name": "Maryam",
  "rollNumber": 101,
  "feeSubmitted": true
}
```

### Create multiple students

```http
POST /api/students
Content-Type: application/json
```

```json
[
  {
    "name": "Maryam",
    "rollNumber": 101,
    "feeSubmitted": true
  },
  {
    "name": "Ali",
    "rollNumber": 102,
    "feeSubmitted": false
  }
]
```

### Update a student

```http
PUT /api/students/:id
Content-Type: application/json
```

```json
{
  "feeSubmitted": true
}
```

### Delete a student

```http
DELETE /api/students/:id
```

Replace `:id` with the MongoDB document ID.

## Student Fields

- `name`: String, required
- `rollNumber`: Number, required
- `feeSubmitted`: Boolean, required
- `createdAt` and `updatedAt`: Added automatically by MongoDB/Mongoose

## Project Structure

```text
config/db.js             MongoDB connection
models/student.js        Student model
routes/studentRoutes.js  Student API routes
server.js                Application entry point
```

`.env` and `node_modules/` are excluded from Git using `.gitignore`.