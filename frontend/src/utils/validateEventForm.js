export const emptyEvent = {
  eventName: '',
  sportName: '',
  eventType: 'Team',
  description: '',
  eventDate: '',
  venue: '',
  maxParticipants: '',
  organizerName: '',
  contactEmail: '',
  status: 'Upcoming'
};

const onlyLettersAndSpaces = /^[A-Za-z ]+$/;
const eventNamePattern = /^(?=.*[A-Za-z])[A-Za-z .,'()&-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
const eventTypes = ['Individual', 'Team', 'Mixed'];

const isBlank = (value) => String(value || '').trim() === '';

export const validateEventForm = (data) => {
  const errors = {};

  if (isBlank(data.eventName)) {
    errors.eventName = 'Event name is required';
  } else if (!eventNamePattern.test(data.eventName.trim())) {
    errors.eventName = 'Use letters, spaces, and basic punctuation only.';
  }

  if (isBlank(data.sportName)) {
    errors.sportName = 'Sport name is required';
  } else if (!onlyLettersAndSpaces.test(data.sportName.trim())) {
    errors.sportName = 'Sport name should contain only letters and spaces';
  }

  if (!eventTypes.includes(data.eventType)) {
    errors.eventType = 'Choose a valid event type';
  }

  if (isBlank(data.description)) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 20 || data.description.trim().length > 500) {
    errors.description = 'Description should be between 20 and 500 characters';
  }

  if (isBlank(data.eventDate)) {
    errors.eventDate = 'Event date is required';
  } else {
    const selectedDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.eventDate = 'Event date cannot be in the past';
    }
  }

  if (isBlank(data.venue)) {
    errors.venue = 'Venue is required';
  } else if (!/[A-Za-z]/.test(data.venue.trim())) {
    errors.venue = 'Venue cannot be only numbers';
  }

  const participants = Number(data.maxParticipants);
  if (isBlank(data.maxParticipants)) {
    errors.maxParticipants = 'Maximum participants is required';
  } else if (!Number.isInteger(participants) || participants < 2 || participants > 500) {
    errors.maxParticipants = 'Enter a whole number between 2 and 500';
  }

  if (isBlank(data.organizerName)) {
    errors.organizerName = 'Organizer name is required';
  } else if (!onlyLettersAndSpaces.test(data.organizerName.trim())) {
    errors.organizerName = 'Organizer name should contain only letters and spaces';
  }

  if (isBlank(data.contactEmail)) {
    errors.contactEmail = 'Contact email is required';
  } else if (!emailPattern.test(data.contactEmail.trim())) {
    errors.contactEmail = 'Enter a valid email address';
  }

  if (!statuses.includes(data.status)) {
    errors.status = 'Choose a valid status';
  }

  return errors;
};

export const toDateInputValue = (dateValue) => {
  if (!dateValue) return '';
  return new Date(dateValue).toISOString().slice(0, 10);
};

export const formatDate = (dateValue) => {
  if (!dateValue) return 'No date';
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};
