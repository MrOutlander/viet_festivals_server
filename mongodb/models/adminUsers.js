const adminUserSchema = new mongoose.Schema({
    adminUserID: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
    },
    adminUserName: {
        type: String,
        required: true,
    },
    adminUserEmail: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

export default AdminUser;