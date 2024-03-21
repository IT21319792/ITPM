import AddAssignment from "../../models/cordinatorModels/AddAssignmentModel.js";

export const addAssignments = async (req, res) => {
    try {
        const { title, type, subType, deadline, description, user, role } = req.body;

        // Check if the assignment type is 'presentation' or 'report' and assign the appropriate subtype 
        let subtypeOptions = [];
        if (type === 'presentation') {
            subtypeOptions = ['proposal', 'progress1', 'progress2', 'final'];
        } else if (type === 'report') {
            subtypeOptions = ['topicAssessmentForm', 'projectCharter', 'statusDocument1', 'logBook', 'proposalDocument', 'statusDocument2', 'finalThesis'];
        }

        // Validate the subtype based on the assignment type
        if (!subtypeOptions.includes(subType)) {
            return res.status(400).json({ message: 'Invalid subtype for the given assignment type' });
        }
        // Check if the title is already added
        const existingAssignment = await AddAssignment.findOne({ title });
        if (existingAssignment) {
            return res.status(400).json({ message: 'An assignment with the same title already exists' });
        }

        //check the user who added the assignments

        const newAssignment = new AddAssignment({
            title,
            type,
            subType,
            deadline,
            description,
            user,
            role
        });

        await newAssignment.save();
        res.status(201).json({ message: 'Assignment added successfully', assignment: newAssignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get all 
export const getAllAssignments = async (req, res) => {
    try {
        const assignments = await AddAssignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Search 
export const searchAssignments = async (req, res) => {
    try {
        const { query } = req.query;
        const assignments = await AddAssignment.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { type: { $regex: query, $options: 'i' } },
                { subType: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Update an assignment by ID
export const updateAssignment = async (req, res) => {
    const { id } = req.params;
    const { title, type, subType, deadline, description,user,role } = req.body;

    try {
        const updatedAssignment = await AddAssignment.findByIdAndUpdate(id, { title, type, subType, deadline, description,user,role }, { new: true });
        if (!updatedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.status(200).json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an assignment by ID
export const deleteAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssignment = await AddAssignment.findByIdAndDelete(id);
        if (!deletedAssignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully', assignment: deletedAssignment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

