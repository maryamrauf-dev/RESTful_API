const express = require('express');
const router = express.Router();
const Students = require('../models/student');

// 1. CREATE: Post a new student or multiple students
router.post('/', async (req, res) => {
  try {
    // Handle array of students
    if (Array.isArray(req.body)) {
      // Validate each student in the array
      for (const student of req.body) {
        if (!student.name || !student.rollNumber || student.feeSubmitted === undefined || student.feeSubmitted === null) {
          return res.status(400).json({ message: 'Please add all required fields for each student (name, rollNumber, feeSubmitted)' });
        }
      }
      const newStudents = await Students.insertMany(req.body);
      return res.status(201).json(newStudents);
    }

    // Handle single student
    if (!req.body.name || !req.body.rollNumber || req.body.feeSubmitted === undefined || req.body.feeSubmitted === null) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }
    const newStudent = await Students.create({
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      feeSubmitted: req.body.feeSubmitted,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. READ: Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Students.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. UPDATE: Modify an existing student by ID
router.put('/:id', async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body, {
      new: true, 
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. DELETE: Remove a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    await student.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Student removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
