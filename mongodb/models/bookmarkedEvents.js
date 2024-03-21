import mongoose from "mongoose";

const bookmarkedEventsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
  });
  
const BookmarkedEvent = mongoose.model('BookmarkedEvent', bookmarkedEventsSchema);

export default BookmarkedEvent;