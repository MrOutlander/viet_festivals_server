import express from "express";

import { getAllEvents, getEventDetails, createEvent, editEvent, deleteEvent } from '../controllers/events.controller.js'

const router = express.Router();

router.route('/').get(getAllEvents);
router.route('/:id').get(getEventDetails);
router.route('/').post(createEvent);
router.route('/:id').patch(editEvent);
router.route('/:id').delete(deleteEvent);

export default router;

