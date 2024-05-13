import PrMemberModel from '../../models/cordinatorModels/PrMember.js';

// Create a new PR member
export const createPrMember = async (req, res) => {
    try {
        // Check if a member with the same details already exists
        const existingMember = await PrMemberModel.findOne({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            staffPost: req.body.staffPost
        });

        // If member already exists, return an error
        if (existingMember) {
            return res.status(400).json({ message: "Member already exists" });
        }

        // Create and save the new member
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

// Find a PR member by first and last name
export const findPrMemberByName = async (req, res) => {
    try {
        const { firstName } = req.params;
        const prMember = await PrMemberModel.findOne({ firstName });

        if (!prMember) {
            res.status(404).json({ message: 'PR member not found' });
            return;
        }

        res.status(200).json(prMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
