const mongoose = require('mongoose');

const textWithLettersAndPunctuation = /^(?=.*[A-Za-z])[A-Za-z .,'()&-]+$/;
const onlyLettersAndSpaces = /^[A-Za-z ]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
      minlength: [3, 'Event name must be at least 3 characters'],
      maxlength: [80, 'Event name cannot exceed 80 characters'],
      match: [textWithLettersAndPunctuation, 'Event name must contain letters and valid punctuation']
    },
    sportName: {
      type: String,
      required: [true, 'Sport name is required'],
      trim: true,
      minlength: [2, 'Sport name must be at least 2 characters'],
      maxlength: [40, 'Sport name cannot exceed 40 characters'],
      match: [onlyLettersAndSpaces, 'Sport name should contain only letters and spaces']
    },
    eventType: {
      type: String,
      required: [true, 'Event type is required'],
      trim: true,
      enum: {
        values: ['Individual', 'Team', 'Mixed'],
        message: 'Event type must be Individual, Team, or Mixed'
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [20, 'Description must be at least 20 characters'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
      validate: {
        validator(value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: 'Event date cannot be in the past'
      }
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
      minlength: [2, 'Venue must be at least 2 characters'],
      maxlength: [100, 'Venue cannot exceed 100 characters'],
      validate: {
        validator(value) {
          return /[A-Za-z]/.test(value);
        },
        message: 'Venue cannot contain only numbers'
      }
    },
    maxParticipants: {
      type: Number,
      required: [true, 'Maximum participants is required'],
      min: [2, 'Maximum participants must be at least 2'],
      max: [500, 'Maximum participants cannot exceed 500']
    },
    organizerName: {
      type: String,
      required: [true, 'Organizer name is required'],
      trim: true,
      minlength: [2, 'Organizer name must be at least 2 characters'],
      maxlength: [60, 'Organizer name cannot exceed 60 characters'],
      match: [onlyLettersAndSpaces, 'Organizer name should contain only letters and spaces']
    },
    contactEmail: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
      match: [emailPattern, 'Please enter a valid email address']
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: statuses,
        message: 'Status must be Upcoming, Ongoing, Completed, or Cancelled'
      },
      default: 'Upcoming'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
