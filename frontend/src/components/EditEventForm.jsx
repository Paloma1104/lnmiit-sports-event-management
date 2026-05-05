import React, { useState } from 'react';
import { FormFields } from './EventForm';
import { toDateInputValue, validateEventForm } from '../utils/validateEventForm';

function EditEventForm({ event, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    ...event,
    eventDate: toDateInputValue(event.eventDate)
  });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

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

    const result = await onSubmit(formData._id, formData);

    if (!result.success) {
      setErrors(result.errors);
      setSubmitMessage(result.message);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="form-heading-row">
        <h2>Edit Event</h2>
        <button type="button" className="light-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <FormFields formData={formData} errors={errors} onChange={handleChange} />
      {submitMessage && <p className="form-message">{submitMessage}</p>}
      <button type="submit" className="primary-btn">
        Save Changes
      </button>
    </form>
  );
}

export default EditEventForm;
