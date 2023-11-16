import express from "express";

import { getAllEvents, getEventDetails, createEvent, editEvent, deleteEvent, getAllEventsMobile } from '../controllers/events.controller.js'

const router = express.Router();

router.route('/').get(getAllEvents);
router.route('/').post(createEvent);

//MobileRoutes
router.route('/nearby').post(getAllEventsMobile);

router.route('/:id').get(getEventDetails);
router.route('/:id').patch(editEvent);
router.route('/:id').delete(deleteEvent);




export default router;

