import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
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
