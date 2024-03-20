import PresentationMarksModel from '../../models/examinerModels/AddMark.js';
import UserModel from '../../models/UserModel.js';


//add
export const addPresentationMarks = async (req, res) => {
  try {
    const { presentationType, userId, marks, rubricIndex } = req.body;

    // Check if the user exists in the database
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if marks already exist for the user and presentation type
    const existingMarks = await PresentationMarksModel.findOne({ userId, presentationType });
    if (existingMarks) {
      return res.status(400).json({ message: 'Marks already exist for this user and presentation type' });
    }

    // Validate marks and rubricIndex
    if (!Array.isArray(marks) || marks.some(mark => typeof mark !== 'number')) {
      return res.status(400).json({ message: 'Invalid marks data' });
    }
    if (typeof rubricIndex !== 'number' || rubricIndex < 0) {
      return res.status(400).json({ message: 'Invalid rubric index' });
    }

    // Create a new entry in the PresentationMarks collection
    const presentationMarks = new PresentationMarksModel({
      presentationType,
      userId,
      marks,
      rubricIndex
    });

    // Save the new entry to the database
    await presentationMarks.save();

    // Respond with success message and user name
    return res.status(201).json({ message: 'Presentation marks added successfully', userName: user.firstName + ' ' + user.lastName, presentationMarks });
  } catch (error) {
    console.error('Error adding presentation marks:', error);
    return res.status(500).json({ message: 'Failed to add presentation marks' });
  }
};


//get all presentation marks
export const getAllPresentationMarks = async (req, res) => {
  try {
    // Fetch all presentation marks from the database
    const presentationMarks = await PresentationMarksModel.find().populate('userId');

    // If there are no marks found, return a 404 
    if (!presentationMarks || presentationMarks.length === 0) {
      return res.status(404).json({ message: 'No presentation marks found' });
    }

    // Map presentation marks to include student names hehe
    const marksWithNames = presentationMarks.map(mark => ({
      presentationType: mark.presentationType,
      studentName: mark.userId.firstName + ' ' + mark.userId.lastName,
      marks: mark.marks,
      rubricIndex: mark.rubricIndex,
      createdAt: mark.createdAt,
      updatedAt: mark.updatedAt
    }));

    // If marks are found, return them with student names as a response
    res.status(200).json(marksWithNames);
  } catch (error) {
    console.error('Error fetching presentation marks with names:', error);
    res.status(500).json({ message: 'Failed to fetch presentation marks with names' });
  }
};


//search with any value
export const searchPresentationMarks = async (req, res) => {
  const { key } = req.params;
  try {
      const searchMarks = await PresentationMarksModel.find({
          $or: [
              { presentationType: { $regex: key, $options: 'i' } },
              { rubricIndex: parseInt(key) }, // Assuming key is a rubricIndex in this case
              { marks: { $in: [parseInt(key)] } } // Assuming key is a mark value in this case
          ]
      });
      res.status(200).json(searchMarks);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



export const getStudentsWithMarksStatus = async (req, res) => {
  try {
    const students = await UserModel.find({ role: 'student' });
    const studentsWithMarks = [];
    for (const student of students) {
      const marksExist = await PresentationMarksModel.exists({ userId: student._id });
      studentsWithMarks.push({ ...student.toObject(), hasMarks: marksExist });
    }
    res.status(200).json(studentsWithMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

