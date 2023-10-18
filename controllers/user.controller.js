import User from "../mongodb/models/users.js";

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Users", error });
    }    
}; //THIS IS WORKING

const createUser = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email }); // Assuming "email" is the unique identifier for the category

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating User", error });
    }
}; //THIS IS WORKING

const editUser = async (req, res) => {};

const deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);
        
        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }
        
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser:", error.message);
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
}; //THIS IS WORKING


const getUserInfoByID = async (req, res) => {
    try {
        const user = await User.findById({ userID: req.params.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching User details", error });
    }    
};

export {
    getAllUsers,
    createUser,
    editUser,
    deleteUser,
    getUserInfoByID,
}