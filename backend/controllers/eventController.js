const Event = require('../models/Event');

const formatMongooseErrors = (error) => {
  const errors = {};

  if (error.name === 'ValidationError') {
    Object.keys(error.errors).forEach((field) => {
      errors[field] = error.errors[field].message;
    });
  }

  return errors;
};

const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    const errors = formatMongooseErrors(error);
    res.status(400).json({
      success: false,
      message: 'Unable to create event',
      errors
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1, createdAt: -1 });

    res.json({
      success: true,
      message: 'Events retrieved successfully',
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Unable to retrieve events'
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.json({
      success: true,
      message: 'Event retrieved successfully',
      data: event
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid event id'
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    });
  } catch (error) {
    const errors = formatMongooseErrors(error);
    return res.status(400).json({
      success: false,
      message: error.name === 'CastError' ? 'Invalid event id' : 'Unable to update event',
      errors
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    return res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Invalid event id'
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};
