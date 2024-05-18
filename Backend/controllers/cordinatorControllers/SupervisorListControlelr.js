import SupervisorListModel from "../../models/cordinatorModels/SupervisorList.js";
// createSupervisor
export const createSupervisorList = async (req, res) => {
    try {
        const existingSupervisor = await SupervisorListModel.findOne({
            email: req.body.email
        });

        if (existingSupervisor) {
            return res.status(400).json({ message: "Supervisor already exists" });
        }

        const newSupervisorList = new SupervisorListModel(req.body);
        await newSupervisorList.save();
        res.status(201).json(newSupervisorList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// getSupervisors
export const getSupervisorsList = async (req, res) => {
    try {
        const supervisors = await SupervisorListModel.find();
        res.status(200).json(supervisors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// getSupervisorById
export const getSupervisorById = async (req, res) => {
    try {
        const supervisor = await SupervisorListModel.findById(req.params.id);
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        res.status(200).json(supervisor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// updateSupervisorById
export const updateSupervisorById = async (req, res) => {
    try {
        const supervisor = await SupervisorListModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        res.status(200).json(supervisor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// deleteSupervisorById
export const deleteSupervisorById = async (req, res) => {
    try {
        const supervisor = await SupervisorListModel.findByIdAndDelete(req.params.id);
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        res.status(200).json({ message: 'Supervisor deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
