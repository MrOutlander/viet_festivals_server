import Event from '../mongodb/models/events.js'

const getAllEvents = async (req, res) => {
    try {
        const events = await EventCategory.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }    
};

const getEventDetails = async (req, res) => {
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

const createEvent = async (req, res) => {
    try {
        const newEvent = new EventCategory(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
};

const editEvent = async (req, res) => {
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
const deleteEvent = async (req, res) => {
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
    getAllEvents,
    getEventDetails,
    createEvent,
    editEvent,
    deleteEvent,
}