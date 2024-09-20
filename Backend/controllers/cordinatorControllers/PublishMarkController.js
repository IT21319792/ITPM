import PublishedMark from '../../models/cordinatorModels/PublishMark.js';

// createSupervisor
// addPublishedMark
export const addPublishedMark = async (req, res) => {
    try {
        const { loggedUser, presentationType, group, groupMarks } = req.body;

        // Check if a similar record already exists
        const existingMark = await PublishedMark.findOne({
            loggedUser,
            presentationType,
            group,
            groupMarks
        });

        if (existingMark) {
            return res.status(400).json({ message: 'This record already exists' });
        }

        // If the record doesn't exist, save the new record
        const newPublishedMark = new PublishedMark({
            loggedUser,
            presentationType,
            group,
            groupMarks
        });
        const savedMark = await newPublishedMark.save();
        res.status(201).json(savedMark);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add published mark', error: error.message });
    }
};

//get
export const getPublishedMarks = async (req, res) => {
    try {
        const publishedMarks = await PublishedMark.find();
        res.status(200).json(publishedMarks);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch published marks', error: error.message });
    }
};

//search
export const getPublishedMarkById = async (req, res) => {
    try {
        const { id } = req.params;
        const publishedMark = await PublishedMark.findById(id);
        if (!publishedMark) {
            return res.status(404).json({ message: 'Published mark not found' });
        }
        res.status(200).json(publishedMark);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch published mark', error: error.message });
    }
};

//delete
export const deletePublishedMark = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMark = await PublishedMark.findByIdAndDelete(id);
        if (!deletedMark) {
            return res.status(404).json({ message: 'Published mark not found' });
        }
        res.status(200).json({ message: 'Published mark deleted successfully', deletedMark });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete published mark', error: error.message });
    }
};