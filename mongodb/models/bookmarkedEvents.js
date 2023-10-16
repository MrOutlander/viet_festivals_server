const mongoose = require('mongoose');

const bookmarkedEventsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  });
  
const BookmarkedEvent = mongoose.model('BookmarkedEvent', bookmarkedEventsSchema);

export default BookmarkedEvent;