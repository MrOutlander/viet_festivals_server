import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    categoryName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
  });
  
const EventCategory = mongoose.model('EventCategory', eventCategorySchema);
  
export default EventCategory