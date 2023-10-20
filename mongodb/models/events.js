import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    externalSources: {
        type: String,
        required: true,
    },
});

// Add a 2dsphere index to the geolocation field
eventSchema.index({ geolocation: '2dsphere' });

const Event = mongoose.model('Event', eventSchema);

export default Event;
