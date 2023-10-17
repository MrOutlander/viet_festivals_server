import express from "express";

import { getAllEventCategories, getEventCategoriesDetails, createEventCategory, editEventCategory, deleteEventCategory } from '../controllers/eventCategories.controller.js'

const router = express.Router();

router.route('/').get(getAllEventCategories);
router.route('/:id').get(getEventCategoriesDetails);
router.route('/').post(createEventCategory);
router.route('/:id').patch(editEventCategory);
router.route('/:id').delete(deleteEventCategory);

export default router;
