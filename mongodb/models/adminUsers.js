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
        unique: true,
    },
    // password: {
    //     type: String,
    //     required: true,
    // },
    avatar: {
        type: String,
        default: "", // or a default avatar URL if you have one
    },
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;