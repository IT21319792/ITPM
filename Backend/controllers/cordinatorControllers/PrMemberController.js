import PrMemberModel from '../../models/cordinatorModels/PrMember.js';

// Create a new PR member
export const createPrMember = async (req, res) => {
    try {
        const newPrMember = new PrMemberModel(req.body);
        await newPrMember.save();
        res.status(201).json(newPrMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all PR members
export const getPrMembers = async (req, res) => {
    try {
        const prMembers = await PrMemberModel.find();
        res.status(200).json(prMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single PR member by ID
export const getPrMemberById = async (req, res) => {
    try {
        const prMember = await PrMemberModel.findById(req.params.id);
        if (!prMember) {
            res.status(404).json({ message: 'PR member not found' });
            return;
        }
        res.status(200).json(prMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a PR member by ID
export const updatePrMember = async (req, res) => {
    try {
        const prMember = await PrMemberModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prMember) {
            res.status(404).json({ message: 'PR member not found' });
            return;
        }
        res.status(200).json(prMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a PR member by ID
export const deletePrMember = async (req, res) => {
    try {
        const prMember = await PrMemberModel.findByIdAndDelete(req.params.id);
        if (!prMember) {
            res.status(404).json({ message: 'PR member not found' });
            return;
        }
        res.status(200).json({ message: 'PR member deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
