import BookmarkedEvent from '../mongodb/models/bookmarkedEvents.js'
import User from '../mongodb/models/users.js'
import Event from '../mongodb/models/events.js'

// Get all bookmarks
const getAllBookmarkedEvents = async (req, res) => {
    try {
        const bookmarkedEvents = await BookmarkedEvent.find().populate('user').populate('event');
        res.json(bookmarkedEvents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single bookmark by ID
const getBookmarkedEventById = async (req, res) => {
    try {
        const bookmarkedEvent = await BookmarkedEvent.findById(req.params.id).populate('user').populate('event');
        if (!bookmarkedEvent) {
            return res.status(404).json({ message: 'Favourite does not exist' });
        }
        res.json(bookmarkedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new bookmark
const createBookmarkedEvent = async (req, res) => {
    try {
        // Check if referenced user and event exist
        const userExists = await User.findById(req.body.user);
        const eventExists = await Event.findById(req.body.event);

        if ( !userExists || !eventExists ) {
            return res.status(400).json({ message: 'User or Event does not exist' });
        }

        const bookmarkedEvent = new BookmarkedEvent(req.body);
        const newBookmarkedEvent = await bookmarkedEvent.save();

        res.status(201).json(newBookmarkedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a bookmark
const editBookmarkedEvent = async (req, res) => {
    try {
        const bookmarkedEvent = await BookmarkedEvent.findById(req.params.id);
        if (!bookmarkedEvent) {
            return res.status(404).json({ message: 'Favourite does not exist' });
        }
        Object.assign(bookmarkedEvent, req.body);
        await bookmarkedEvent.save();
        res.json(bookmarkedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bookmark
const deleteBookmarkedEvent = async (req, res) => {
    try {
        // Step 1: Fetch the bookmark to get the Event ID
        const bookmarkedEvent = await BookmarkedEvent.findById(req.params.id);
        if (!bookmarkedEvent) {
            return res.status(404).json({ message: 'Favourite does not exist' });
        }

        // Step 2: Delete the bookmark
        await BookmarkedEvent.findByIdAndDelete(req.params.id);

        res.json({ message: 'Unfavourited the event' });
    } catch (error) {
        console.error('Error finding the favourite', error);
        res.status(500).json({ message: error.message });
    }
};

//MOBILE

const createBookmarkedEventMobile = async (req, res) => {
    try {
        // Directly create a favourite without checking if related documents exist
        const bookmarkedEvent = new BookmarkedEvent({
            user: req.body.user,
            event: req.body.event,
        });

        const newBookmarkedEvent = await bookmarkedEvent.save();

        res.status(201).json(newBookmarkedEvent);
    } catch (error) {
        console.error('Error creating favourite event:', error);
        res.status(400).json({ message: 'Error creating favourite', error: error.message });
    }
};

// Get all bookmarks for a specific user
const getBookmarkedEventsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId; // Or use req.query.userId if you prefer to use query parameters
        const bookmarkedEvent = await BookmarkedEvent.find({ user: userId })/*.populate('user')*/
            // .populate('event');
            .populate({
                path: 'event',
                populate: {
                  path: 'eventType',
                  select: 'categoryName', // Adjust based on your schema
                }
            })
        res.json(bookmarkedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export {
    getAllBookmarkedEvents,
    getBookmarkedEventById,
    createBookmarkedEvent,
    editBookmarkedEvent,
    deleteBookmarkedEvent,

    //MOBILE
    createBookmarkedEventMobile,
    getBookmarkedEventsByUserId,
};
