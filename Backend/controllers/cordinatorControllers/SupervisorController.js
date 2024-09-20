import SupervisorModel from './../../models/cordinatorModels/Supervisor.js';

// createSupervisor
export const createSupervisor = async (req, res) => {
    try {
        const existingSupervisor = await SupervisorModel.findOne({
            email: req.body.email
        });

        if (existingSupervisor) {
            return res.status(400).json({ message: "Supervisor already exists" });
        }

        const newSupervisor = new SupervisorModel(req.body);
        await newSupervisor.save();
        res.status(201).json(newSupervisor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// getSupervisors
export const getSupervisors = async (req, res) => {
    try {
        const supervisors = await SupervisorModel.find();
        res.status(200).json(supervisors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// getSupervisorById
export const getSupervisorById = async (req, res) => {
    try {
        const supervisor = await SupervisorModel.findById(req.params.id);
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
        const supervisor = await SupervisorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
        const supervisor = await SupervisorModel.findByIdAndDelete(req.params.id);
        if (!supervisor) {
            return res.status(404).json({ message: 'Supervisor not found' });
        }
        res.status(200).json({ message: 'Supervisor deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
