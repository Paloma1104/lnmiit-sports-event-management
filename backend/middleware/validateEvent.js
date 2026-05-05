const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
const eventTypes = ['Individual', 'Team', 'Mixed'];

const hasValue = (value) => value !== undefined && value !== null && String(value).trim() !== '';
const onlyLettersAndSpaces = /^[A-Za-z ]+$/;
const eventNamePattern = /^(?=.*[A-Za-z])[A-Za-z .,'()&-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEvent = (req, res, next) => {
  const {
    eventName,
    sportName,
    eventType,
    description,
    eventDate,
    venue,
    maxParticipants,
    organizerName,
    contactEmail,
    status
  } = req.body;

  const errors = {};

  if (!hasValue(eventName)) {
    errors.eventName = 'Event name is required';
  } else if (!eventNamePattern.test(eventName.trim())) {
    errors.eventName = 'Event name should contain letters, spaces, and basic punctuation only';
  }

  if (!hasValue(sportName)) {
    errors.sportName = 'Sport name is required';
  } else if (!onlyLettersAndSpaces.test(sportName.trim())) {
    errors.sportName = 'Sport name should contain only letters and spaces';
  }

  if (!hasValue(eventType)) {
    errors.eventType = 'Event type is required';
  } else if (!eventTypes.includes(eventType)) {
    errors.eventType = 'Event type must be Individual, Team, or Mixed';
  }

  if (!hasValue(description)) {
    errors.description = 'Description is required';
  } else if (description.trim().length < 20 || description.trim().length > 500) {
    errors.description = 'Description should be between 20 and 500 characters';
  }

  if (!hasValue(eventDate)) {
    errors.eventDate = 'Event date is required';
  } else {
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      errors.eventDate = 'Please enter a valid event date';
    } else if (selectedDate < today) {
      errors.eventDate = 'Event date cannot be in the past';
    }
  }

  if (!hasValue(venue)) {
    errors.venue = 'Venue is required';
  } else if (!/[A-Za-z]/.test(venue.trim())) {
    errors.venue = 'Venue cannot be empty or only numbers';
  }

  const participants = Number(maxParticipants);
  if (!hasValue(maxParticipants)) {
    errors.maxParticipants = 'Maximum participants is required';
  } else if (!Number.isInteger(participants) || participants < 2 || participants > 500) {
    errors.maxParticipants = 'Maximum participants must be a whole number between 2 and 500';
  }

  if (!hasValue(organizerName)) {
    errors.organizerName = 'Organizer name is required';
  } else if (!onlyLettersAndSpaces.test(organizerName.trim())) {
    errors.organizerName = 'Organizer name should contain only letters and spaces';
  }

  if (!hasValue(contactEmail)) {
    errors.contactEmail = 'Contact email is required';
  } else if (!emailPattern.test(contactEmail.trim())) {
    errors.contactEmail = 'Please enter a valid email address';
  }

  if (!hasValue(status)) {
    errors.status = 'Status is required';
  } else if (!statuses.includes(status)) {
    errors.status = 'Status must be Upcoming, Ongoing, Completed, or Cancelled';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  return next();
};

module.exports = validateEvent;
