const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const validateEvent = require('../middleware/validateEvent');

const router = express.Router();

router.post('/', validateEvent, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id', validateEvent, updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
