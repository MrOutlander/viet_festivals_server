// import bcrypt from 'bcrypt';

import AdminUser from '../mongodb/models/adminUsers.js';


const getAllAdminUsers = async (req, res) => {};
const createAdminUser = async (req, res) => {
    try {
        const { name, email, /*password,*/ avatar } = req.body;

        const adminUserExists = await AdminUser.findOne({ email });

        if(adminUserExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const newAdminUser = await AdminUser.create({ 
            name,
            email,
            // password: hashedPassword,
            avatar,
        });

        res.status(200).json(newAdminUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editAdminUser = async (req, res) => {};
const deleteAdminUser = async (req, res) => {};
const getAdminUserInfoByID = async (req, res) => {};

export {
    getAllAdminUsers,
    createAdminUser,
    editAdminUser,
    deleteAdminUser,
    getAdminUserInfoByID,
}