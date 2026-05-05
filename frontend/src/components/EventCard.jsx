import React from 'react';
import { formatDate } from '../utils/validateEventForm';

function EventCard({ event, onView, onEdit, onDelete }) {
  return (
    <article className="event-card">
      <div className="card-main">
        <div>
          <h3>{event.eventName}</h3>
          <p>
            {event.sportName} | {event.eventType}
          </p>
        </div>
        <span className={`status-badge status-${event.status.toLowerCase()}`}>{event.status}</span>
      </div>

      <div className="card-meta">
        <span>{formatDate(event.eventDate)}</span>
        <span>{event.venue}</span>
        <span>{event.maxParticipants} seats</span>
      </div>

      <div className="card-actions">
        <button type="button" onClick={() => onView(event)}>
          View
        </button>
        <button type="button" onClick={() => onEdit(event)}>
          Edit
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(event._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default EventCard;
