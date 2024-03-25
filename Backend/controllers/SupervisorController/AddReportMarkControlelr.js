import ReportMarkAddModel from '../../models/supervisorModels/AddReportMark.js';

// Add
export const addReportMarks = async (req, res) => {
  try {
    const { reportType, groupMarks, group } = req.body;
    const newReportMark = new ReportMarkAddModel({
      reportType,
      group,
      groupMarks
    });

    const savedMark = await newReportMark.save();
    res.status(201).json({
      message: 'Report marks added successfully',
      result: {
        data: savedMark,
        response: true,
        status: 201,
      },
    });
  } catch (error) {
    console.error('Error adding report marks:', error);
    res.status(500).json({ error: 'Failed to add report marks', details: error.message });
  }
};

// Get all
// Get all report marks
export const getAllReportMarks = async (req, res) => {
  try {
    const reportMarks = await ReportMarkAddModel.find();
    res.status(200).json(reportMarks);
  } catch (error) {
    console.error('Error fetching report marks:', error);
    res.status(500).json({ error: 'Failed to fetch report marks', details: error.message });
  }
};

// Get report marks by ID
export const getReportMarkById = async (req, res) => {
  try {
    const markId = req.params.id;
    const reportMark = await ReportMarkAddModel.findById(markId);
    if (!reportMark) {
      return res.status(404).json({ error: 'Report mark not found' });
    }
    res.status(200).json(reportMark);
  } catch (error) {
    console.error('Error fetching report mark by ID:', error);
    res.status(500).json({ error: 'Failed to fetch report mark', details: error.message });
  }
};

// Update report marks
export const updateReportMarks = async (req, res) => {
  try {
    const markId = req.params.id;
    const updatedData = req.body;
    const updatedMark = await ReportMarkAddModel.findByIdAndUpdate(markId, updatedData, { new: true });
    res.status(200).json(updatedMark);
  } catch (error) {
    console.error('Error updating report mark:', error);
    res.status(500).json({ error: 'Failed to update report mark', details: error.message });
  }
};

// Delete report marks
export const deleteReportMarks = async (req, res) => {
  try {
    const markId = req.params.id;
    await ReportMarkAddModel.findByIdAndDelete(markId);
    res.status(200).json({ message: 'Report mark deleted successfully' });
  } catch (error) {
    console.error('Error deleting report mark:', error);
    res.status(500).json({ error: 'Failed to delete report mark', details: error.message });
  }
};