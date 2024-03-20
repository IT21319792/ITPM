import PrMemberAssignShedule from '../../models/cordinatorModels/PrMemberAssignShedule.js';

// Create - Assigning PR member to schedule presentation

export const assignShedule = async (req, res) => {
    const { firstName, selectedAssignment, selectedSubType } = req.body;
    const newAssignShedule = new PrMemberAssignShedule({
        firstName: firstName,
        selectedAssignment: selectedAssignment,
        selectedSubType: selectedSubType
    });

    try {
        await newAssignShedule.save();
        res.status(200).json({ message: `Assigning Project member ${firstName} to schedule presentation is successful` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get all 
export const getAssignShedule = async (req, res) => {
    try {
        const allAssignShedules = await PrMemberAssignShedule.find();
        res.status(200).json(allAssignShedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update assigned member
export const updateAssignedShedule = async (req, res) => {
    const { id } = req.params;
    const { firstName, selectedAssignment, selectedSubType } = req.body;

    try {
        const updatedAssigenedShedule = await PrMemberAssignShedule.findByIdAndUpdate(id, {
            memberName: firstName,
            presentationName: selectedAssignment,
            subType: selectedSubType
        }, { new: true }); // { new: true } ensures that the updated document is returned
        if (!updatedAssigenedShedule) {
            return res.status(404).json({ message: 'Assigned member not found' });
        }
        res.status(200).json({ message: 'Assigned member details updated successfully', subject: updatedAssigenedShedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete assigned member details
export const deleteAssignShedule = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAssignShedule = await PrMemberAssignShedule.findByIdAndDelete(id);
        if (!deletedAssignShedule) {
            return res.status(404).json({ message: 'Scheduled presentation not found' });
        }
        res.status(200).json({ message: `Scheduled presentation deleted successfully`, subject: deletedAssignShedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get one assigned member details
export const getOneAssignShedule = async (req, res) => {
    const { id } = req.params;

    try {
        const oneAssignedShedule = await PrMemberAssignShedule.findById(id);
        res.status(200).json(oneAssignedShedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Search with any value
export const searchAssignShedule = async (req, res) => {
    const { key } = req.params;

    try {
        const searchAssignShedule = await PrMemberAssignShedule.find({
            $or: [
                { memberName: { $regex: key, $options: 'i' } },
                { semester: { $regex: key, $options: 'i' } },
                { presentationName: { $regex: key, $options: 'i' } }
            ]
        });
        res.status(200).json(searchAssignShedule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
