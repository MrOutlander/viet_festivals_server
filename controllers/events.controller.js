import Event from '../mongodb/models/events.js'
import EventCategory from '../mongodb/models/eventCategories.js';

const getAllEvents = async (req, res) => {
    const { _order = 'asc', _sort = 'eventDate', eventName_like = '', eventType = '' } = req.query;

    const query = {};

    if(eventType !== '') {
        query.eventType = eventType;
    
    }
    if(eventName_like) {
        query.eventName = { $regex: eventName_like, $options: 'i'};
    }

    const sortOrder = _order === 'desc' ? -1 : 1; // 'desc' for descending, otherwise ascending

    try {
        const events = await Event.find(query)
                                .sort({ [_sort]: sortOrder })
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



// FUNCTIONS SPECIFIC FOR THE MOBILE APP

const getAllEventsMobile = async (req, res) => {   
    
    try {
        // Default startDate to current date to ensure only future events are considered
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
        let endDate = req.query.endDate ? new Date(req.query.endDate) : null;

        // Set the time to the start of the current day
        startDate.setHours(0, 0, 0, 0);

        // If endDate is provided, ensure it's not set in the past relative to startDate
        if (endDate && endDate < startDate) {
            endDate = null;
        }

        // Construct the match query
        const matchQuery = {
            eventDate: { $gte: startDate }
        };
        // Add the upper range for date if endDate is provided
        if (endDate) {
            endDate.setHours(23, 59, 59, 999); // Set time to the end of the day for endDate
            matchQuery.eventDate.$lte = endDate;
        }

        const userLocation = {
            type: "Point",
            coordinates: [req.body.longitude, req.body.latitude] // [longitude, latitude]
        };

        const events = await Event.aggregate([
            {
                $match: {
                    eventDate: { $gte: currentDate } // This allows only future events
                }
            },
            {
                $geoNear: {
                    near: userLocation,
                    distanceField: "distance", // This will add a 'distance' field to each document
                    spherical: true,
                }
            },
            {
                $lookup: {
                    from: "eventcategories", // This should be the name of the EventCategory collection in MongoDB
                    localField: "eventType",
                    foreignField: "_id",
                    as: "eventType"
                }
            },
            {
                $unwind: "$eventType"
            },
            {
                $project: {
                    // Include fields you want to send in the response
                    eventName: 1,
                    eventDate: 1,
                    eventSummary: 1,
                    bestToAttend: 1,
                    thumb: 1,
                    images: 1,
                    geolocation: 1,
                    externalSources: 1,
                    eventType: "$eventType.categoryName",
                    distance: 1
                }
            }
        ]);

        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};



export {
    getAllEvents,
    getEventDetails,
    createEvent,
    editEvent,
    deleteEvent,
    
    // MOBILE APP CALLS
    getAllEventsMobile,
}