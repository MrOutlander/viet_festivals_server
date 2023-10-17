// import bcrypt from 'bcrypt';

import AdminUser from '../mongodb/models/adminUsers.js';


const getAllAdminUsers = async (req, res) => {};
const createAdminUser = async (req, res) => {
    try {
        const { name, email, avatar } = req.body;

        let adminUser = await AdminUser.findOne({ email });

        if (!adminUser) {
            adminUser = new AdminUser({
                name,
                email,
                avatar,
            });
            await adminUser.save();
        }

        return res.status(200).json(adminUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
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