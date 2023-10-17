import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    eventName: {
        type: String,
        required: true,
    },
    eventType: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'EventCategory' 
    },
    eventDate: {
        type: String,
        required: true,
    },
    eventSummary: {
        type: String,
        required: true,
    },
    bestToAttend: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: true,
    },
    images: [
        String
    ],
    geolocation: {
      latitude: Number,
      longitude: Number
    },
    externalSources: {
        type: String,
        required: true,
    },
  });

const Event = mongoose.model('Event', eventSchema);

export default Event;
