import User from "../mongodb/models/users.js";
import bcrypt from 'bcrypt';

// TO GET A LIST OF USERS
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
        const salt = await bcrypt.genSalt(10); // 10 rounds is recommended
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            ...req.body,
            password: hashedPassword // Store the hashed password instead of the plain one
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating User", error });
    }
}; //THIS IS WORKING

// TO EDIT USERS
const editUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the password is being updated
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
}; // THIS WORKS


// TO DELETE USERS
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

// TO GET USER INFO
const getUserInfoByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching User details", error });
    }    
}; //THIS WORKS

export {
    getAllUsers,
    createUser,
    editUser,
    deleteUser,
    getUserInfoByID,
}