import AdminUser from '../mongodb/models/adminUsers.js';


// TO GET A LIST OF ADMIN USERS
const getAllAdminUsers = async (req, res) => {
    try {
        const adminusers = await AdminUser.find();
        res.status(200).json(adminusers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Admin Users", error });
    }   
}; // THIS WORKS


const createAdminUser = async (req, res) => {
    // try {
    //     const existingAdminUser = await AdminUser.findOne({ email: req.body.email }); 

    //     if (existingAdminUser) {
    //         return res.status(400).json({ message: "Admin User already exists" });
    //     }

    //     const newAdminUser = new AdminUser(req.body);
    //     const savedAdminUser = await newAdminUser.save();
    //     res.status(201).json(savedAdminUser);
    // } catch (error) {
    //     res.status(500).json({ message: "Error creating Admin User", error });
    // }

    try {
        const { name, email, avatar } = req.body;
        
        // Check if the user already exists
        let adminUser = await AdminUser.findOne({ email });
        
        // If the user exists, log them in instead of creating a new user
        if (adminUser) {
            // Perform any login operations here if needed
            // For example, generate a token, update last login date, etc.

            // Respond with the existing user
            return res.status(200).json(adminUser);
        } else {
            // If the user does not exist, create a new user
            adminUser = new AdminUser({ name, email, avatar });
            await adminUser.save();

            // Respond with the newly created user
            return res.status(201).json(adminUser);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const editAdminUser = async (req, res) => {
    try {
        const updatedAdminUser = await AdminUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdminUser) {
            return res.status(404).json({ message: "Admin User not found" });
        }
        res.status(200).json(updatedAdminUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating Admin User", error });
    }
};

const deleteAdminUser = async (req, res) => {
    try {
        const adminuserToDelete = await AdminUser.findById(req.params.id);
        
        if (!adminuserToDelete) {
            return res.status(404).json({ message: "User not found" });
        }
        
        await AdminUser.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Admin User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser:", error.message);
        res.status(500).json({ message: "Error deleting Admin User", error: error.message });
    }
};


const getAdminUserInfoByID = async (req, res) => {
    try {
        const adminuser = await AdminUser.findById(req.params.id);
        if (!adminuser) {
            return res.status(404).json({ message: "Admin User not found" });
        }
        res.status(200).json(adminuser);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Admin User details", error });
    } 
};

export {
    getAllAdminUsers,
    createAdminUser,
    editAdminUser,
    deleteAdminUser,
    getAdminUserInfoByID,
}