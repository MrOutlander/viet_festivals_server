import express from "express";

import { getAllAdminUsers, createAdminUser, editAdminUser, deleteAdminUser, getAdminUserInfoByID } from '../controllers/adminUsers.controller.js'

const router = express.Router();

router.route('/').get(getAllAdminUsers);
router.route('/:id').get(getAdminUserInfoByID);
router.route('/').post(createAdminUser);
router.route('/:id').patch(editAdminUser);
router.route('/:id').delete(deleteAdminUser);

export default router;
