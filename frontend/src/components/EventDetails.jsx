import React from 'react';
import { formatDate } from '../utils/validateEventForm';

function EventDetails({ event, onClose, onEdit }) {
  return (
    <div className="details-backdrop">
      <section className="details-panel">
        <div className="details-header">
          <div>
            <p className="eyebrow">Event Details</p>
            <h2>{event.eventName}</h2>
          </div>
          <button type="button" className="light-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <dl className="details-grid">
          <div>
            <dt>Sport</dt>
            <dd>{event.sportName}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{event.eventType}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{formatDate(event.eventDate)}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{event.venue}</dd>
          </div>
          <div>
            <dt>Participants</dt>
            <dd>{event.maxParticipants}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{event.status}</dd>
          </div>
          <div>
            <dt>Organizer</dt>
            <dd>{event.organizerName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{event.contactEmail}</dd>
          </div>
        </dl>

        <div className="description-box">
          <h3>Description</h3>
          <p>{event.description}</p>
        </div>

        <button type="button" className="primary-btn" onClick={() => onEdit(event)}>
          Edit This Event
        </button>
      </section>
    </div>
  );
}

export default EventDetails;
