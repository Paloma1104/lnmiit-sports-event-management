import React, { useState } from 'react';
import { emptyEvent, validateEventForm } from '../utils/validateEventForm';
import toast from 'react-hot-toast';

function EventForm({ onSubmit }) {
  const [formData, setFormData] = useState(emptyEvent);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateEventForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await onSubmit(formData);

    if (result.success) {
      setFormData(emptyEvent);
      setErrors({});
      toast.success('Event added to the list.');
    } else {
      setErrors(result.errors);
      toast.error(result.message);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <FormFields formData={formData} errors={errors} onChange={handleChange} />
      <button type="submit" className="primary-btn">
        Create Event
      </button>
    </form>
  );
}

export function FormFields({ formData, errors, onChange }) {
  return (
    <>
      <label>
        Event Name
        <input name="eventName" value={formData.eventName} onChange={onChange} />
        {errors.eventName && <span className="field-error">{errors.eventName}</span>}
      </label>

      <label>
        Sport Name
        <input name="sportName" value={formData.sportName} onChange={onChange} />
        {errors.sportName && <span className="field-error">{errors.sportName}</span>}
      </label>

      <label>
        Event Type
        <select name="eventType" value={formData.eventType} onChange={onChange}>
          <option value="Individual">Individual</option>
          <option value="Team">Team</option>
          <option value="Mixed">Mixed</option>
        </select>
        {errors.eventType && <span className="field-error">{errors.eventType}</span>}
      </label>

      <label>
        Description
        <textarea name="description" value={formData.description} onChange={onChange} rows="4" />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </label>

      <label>
        Event Date
        <input type="date" name="eventDate" value={formData.eventDate} onChange={onChange} />
        {errors.eventDate && <span className="field-error">{errors.eventDate}</span>}
      </label>

      <label>
        Venue
        <input name="venue" value={formData.venue} onChange={onChange} />
        {errors.venue && <span className="field-error">{errors.venue}</span>}
      </label>

      <label>
        Max Participants
        <input
          type="number"
          name="maxParticipants"
          value={formData.maxParticipants}
          onChange={onChange}
          min="2"
          max="500"
        />
        {errors.maxParticipants && <span className="field-error">{errors.maxParticipants}</span>}
      </label>

      <label>
        Organizer Name
        <input name="organizerName" value={formData.organizerName} onChange={onChange} />
        {errors.organizerName && <span className="field-error">{errors.organizerName}</span>}
      </label>

      <label>
        Contact Email
        <input name="contactEmail" value={formData.contactEmail} onChange={onChange} />
        {errors.contactEmail && <span className="field-error">{errors.contactEmail}</span>}
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={onChange}>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {errors.status && <span className="field-error">{errors.status}</span>}
      </label>
    </>
  );
}

export default EventForm;
