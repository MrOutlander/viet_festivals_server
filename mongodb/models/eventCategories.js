import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumb: {
        type: String,
        required: false, // Not mandatory
        default: null,
    },
    }, 
    {
        timestamps: true
    }
);
  
const EventCategory = mongoose.model('EventCategory', eventCategorySchema);
  
export default EventCategory