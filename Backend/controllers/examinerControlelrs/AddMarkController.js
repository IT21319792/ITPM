import ExaminerPresentationMarksModel from '../../models/examinerModels/AddMark.js';
import UserModel from '../../models/UserModel.js';

// Add presentation marks
export const addPresentationMarks = async (req, res) => {
  try {
    const { presentationType, students } = req.body;

    // Iterate through each student to add marks
    for (const student of students) {
      const { firstName, marks } = student;

      // Check if the user exists in the database
      const user = await UserModel.findOne({ firstName }); // Assuming firstName is unique
      if (!user) {
        return res.status(404).json({ message: `User '${firstName}' not found` });
      }

      // Check if marks already exist for the user and presentation type
      const existingMarks = await ExaminerPresentationMarksModel.findOne({ presentationType, 'students.firstName': firstName });
      if (existingMarks) {
        return res.status(400).json({ message: `Marks already exist for user '${firstName}' and presentation type '${presentationType}'` });
      }

      // Create a new entry in the ExaminerPresentationMarks collection
      const presentationMarks = new ExaminerPresentationMarksModel({
        presentationType,
        students: [{
          firstName,
          marks
        }]
      });

      // Save the new entry to the database
      await presentationMarks.save();
    }

    // Respond with success message
    return res.status(201).json({ message: 'Presentation marks added successfully' });
  } catch (error) {
    console.error('Error adding presentation marks:', error);
    return res.status(500).json({ message: 'Failed to add presentation marks' });
  }
};


// Get all presentation marks
export const getAllPresentationMarks = async (req, res) => {
  try {
    // Fetch all presentation marks from the database
    const presentationMarks = await ExaminerPresentationMarksModel.find();

    // If there are no marks found, return a 404
    if (!presentationMarks || presentationMarks.length === 0) {
      return res.status(404).json({ message: 'No presentation marks found' });
    }

    // If marks are found, return them
    res.status(200).json(presentationMarks);
  } catch (error) {
    console.error('Error fetching presentation marks:', error);
    res.status(500).json({ message: 'Failed to fetch presentation marks' });
  }
};

// Search presentation marks
export const searchPresentationMarks = async (req, res) => {
  const { key } = req.params;
  try {
    const searchMarks = await ExaminerPresentationMarksModel.find({
      $or: [
        { presentationType: { $regex: key, $options: 'i' } },
        { 'students.firstName': { $regex: key, $options: 'i' } }
      ]
    });
    res.status(200).json(searchMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get students with marks status
export const getStudentsWithMarksStatus = async (req, res) => {
  try {
    const students = await UserModel.find({ role: 'student' });
    const studentsWithMarks = [];
    for (const student of students) {
      const marksExist = await ExaminerPresentationMarksModel.exists({ 'students.firstName': student.firstName });
      studentsWithMarks.push({ ...student.toObject(), hasMarks: marksExist });
    }
    res.status(200).json(studentsWithMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
