import React from 'react';
import EventCard from './EventCard';

function EventList({ events, loading, onView, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className="shimmer-grid">
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
        <div className="shimmer-card"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return <p className="empty-state">No sports events added yet.</p>;
  }

  return (
    <div>
      <div className="panel-title-row">
        <h2>All Events</h2>
        <span>{events.length} records</span>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;
