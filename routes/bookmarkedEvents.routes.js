import express from "express"

import {     
    getAllBookmarkedEvents,
    createBookmarkedEvent,
    createBookmarkedEventMobile,
    deleteBookmarkedEvent,
    editBookmarkedEvent,
    getBookmarkedEventById,
    getBookmarkedEventsByUserId,
} from '../controllers/bookmarkedEvents.controller.js'

const router = express.Router();

    //MOBILE
router.route('/mobile').post(createBookmarkedEventMobile);
router.route('/user/:userId').get(getBookmarkedEventsByUserId);

    // DESKTOP
router.route('/').get(getAllBookmarkedEvents);
router.route('/:id').get(getBookmarkedEventById);
router.route('/').post(createBookmarkedEvent);
router.route('/:id').patch(editBookmarkedEvent);
router.route('/:id').delete(deleteBookmarkedEvent);

export default router;