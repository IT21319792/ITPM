import ResearchModel from "../../models/studentModels/ResearchModel.js";

export const createResearch = async (req, res) => {
    const {
        groupID,
        title,
        student1,
        student2,
        student3,
        student4,
        supervisor1,
        supervisor2,
        coSupervisor1,
        coSupervisor2,
        journalName,
        issnNumber,
        h5IndexLink,
        hIndexLink,
        scopusSiteLink,
        imageLinkOfAcceptanceLetter
    } = req.body;

    try {
        const newResearch = await ResearchModel.create({
            groupID,
            title,
            student1,
            student2,
            student3,
            student4,
            supervisor1,
            supervisor2,
            coSupervisor1,
            coSupervisor2,
            journalName,
            issnNumber,
            h5IndexLink,
            hIndexLink,
            scopusSiteLink,
            imageLinkOfAcceptanceLetter
        });

        return res.status(201).json(newResearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};


export const getAllResearch = async (req, res) => {
    try {
        const research = await ResearchModel.find();
        res.status(200).json(research);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOneResearch = async (req, res) => {
    try {
        const id = req.params.id;
        const research = await ResearchModel.findById(id);
        res.status(200).json(research);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteResearch = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedResearch = await ResearchModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Research Deleted Successfully', item: deletedResearch });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateResearch = async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedResearch = await ResearchModel.findByIdAndUpdate(id, newData, { new: true });
        res.status(200).json({ message: 'Research Updated Successfully', item: updatedResearch });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
