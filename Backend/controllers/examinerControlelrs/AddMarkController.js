import PresentationMarkAddModel from "../../models/examinerModels/AddMark.js";

//add
export const addPresentationMarks = async (req, res) => {
  try {
    const {  presentationType,groupMarks,group } = req.body;
    const newPresentationMark = new PresentationMarkAddModel({
      presentationType,
      group,
      groupMarks
    });

    const savedMark = await newPresentationMark.save();
    res.status(201).json({
      message: 'Presentation added successfully',
      result: {
        data: savedMark,
        response: true,
        status: 201,
      },
    });
  } catch (error) {
    console.error('Error adding presentation:', error);
    res.status(500).json({ error: 'Failed to add presentation', details: error.message });
  }
};

//get all
// Get all presentation marks
export const getAllPresentationMarks = async (req, res) => {
  try {
    const presentationMarks = await PresentationMarkAddModel.find();
    res.status(200).json(presentationMarks);
  } catch (error) {
    console.error('Error fetching presentation marks:', error);
    res.status(500).json({ error: 'Failed to fetch presentation marks', details: error.message });
  }
};

// Get presentation marks by ID
export const getPresentationMarkById = async (req, res) => {
  try {
    const markId = req.params.id;
    const presentationMark = await PresentationMarkAddModel.findById(markId);
    if (!presentationMark) {
      return res.status(404).json({ error: 'Presentation mark not found' });
    }
    res.status(200).json(presentationMark);
  } catch (error) {
    console.error('Error fetching presentation mark by ID:', error);
    res.status(500).json({ error: 'Failed to fetch presentation mark', details: error.message });
  }
};

// Update presentation marks
export const updatePresentationMarks = async (req, res) => {
  try {
    const markId = req.params.id;
    const updatedData = req.body;
    const updatedMark = await PresentationMarkAddModel.findByIdAndUpdate(markId, updatedData, { new: true });
    res.status(200).json(updatedMark);
  } catch (error) {
    console.error('Error updating presentation mark:', error);
    res.status(500).json({ error: 'Failed to update presentation mark', details: error.message });
  }
};

// Delete presentation marks
export const deletePresentationMarks = async (req, res) => {
  try {
    const markId = req.params.id;
    await PresentationMarkAddModel.findByIdAndDelete(markId);
    res.status(200).json({ message: 'Presentation mark deleted successfully' });
  } catch (error) {
    console.error('Error deleting presentation mark:', error);
    res.status(500).json({ error: 'Failed to delete presentation mark', details: error.message });
  }
};