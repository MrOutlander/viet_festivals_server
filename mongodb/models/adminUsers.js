import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: null, 
    },
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;
