import EventCategory from '../mongodb/models/eventCategories.js'

const getAllEventCategories = async (req, res) => {
    try {
        const events = await EventCategory.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }    
};

const getEventCategoriesDetails = async (req, res) => {
    try {
        const event = await EventCategory.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event details", error });
    }    
};

const createEventCategory = async (req, res) => {
    try {
        const existingEventCategory = await EventCategory.findOne({ categoryName: req.body.categoryName }); // Assuming "name" is the unique identifier for the category

        if (existingEventCategory) {
            return res.status(400).json({ message: "Event Category already exists" });
        }

        const newCategory = new EventCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating Category", error });
    }
};

const editEventCategory = async (req, res) => {
    try {
        const updatedEvent = await EventCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
};
const deleteEventCategory = async (req, res) => {
    try {
        const deletedEvent = await EventCategory.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
};

export {
    getAllEventCategories,
    getEventCategoriesDetails,
    createEventCategory,
    editEventCategory,
    deleteEventCategory,
}