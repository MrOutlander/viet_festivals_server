import express from "express";

import { getAllUsers, createUser, editUser, deleteUser, getUserInfoByID } from '../controllers/user.controller.js'

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserInfoByID);
router.route('/').post(createUser);
router.route('/:id').patch(editUser);
router.route('/:id').delete(deleteUser);

export default router;
