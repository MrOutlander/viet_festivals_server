import Event from '../mongodb/models/events.js'
import EventCategory from '../mongodb/models/eventCategories.js';

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
                                .populate({
                                    path: 'eventType',
                                    select: 'categoryName'
                                })
                                .lean()  // This will make sure we get plain JS objects
                                .exec();

        // Transform the events
        const transformedEvents = events.map(event => {
            return {
                ...event, 
                eventType: event.eventType.categoryName
            };
        });

        res.status(200).json(transformedEvents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }    
}; //THIS WORKS


const getEventDetails = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
                                 .populate({
                                     path: 'eventType',
                                     select: 'categoryName'  // Only select the categoryName field
                                 })
                                 .exec();

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error fetching event details", error });
    }    
}; //THIS WORKS


const createEvent = async (req, res) => {
    console.log(req.body);
    try {
        // Validate eventName
        if (!req.body.eventName || req.body.eventName.trim() === '' || req.body.eventName.length > 100) {
            return res.status(400).json({ message: "Invalid Event Name. It should not be empty and should be less than 100 characters." });
        }

        const newEvent = new Event(req.body);
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating event:", error);

        // Handle specific errors (e.g., validation errors)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        // Send a generic error message to the client
        res.status(500).json({ message: "Error creating event" });
    }
}; //THIS WORKS


const editEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
}; //THIS WORKS
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
    }
}; //THIS WORKS

export {
    getAllEvents,
    getEventDetails,
    createEvent,
    editEvent,
    deleteEvent,
}