import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createEvent, deleteEvent, getEvents, updateEvent } from './api/eventApi';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import EditEventForm from './components/EditEventForm';
import './styles/App.css';

const buildEventPayload = (eventData) => ({
  eventName: eventData.eventName,
  sportName: eventData.sportName,
  eventType: eventData.eventType,
  description: eventData.description,
  eventDate: eventData.eventDate,
  venue: eventData.venue,
  maxParticipants: eventData.maxParticipants,
  organizerName: eventData.organizerName,
  contactEmail: eventData.contactEmail,
  status: eventData.status
});

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const result = await getEvents();
      setEvents(result.data);
    } catch (error) {
      setMessage('Could not load events. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreate = async (eventData) => {
    try {
      const result = await createEvent(eventData);
      setEvents((currentEvents) => [result.data, ...currentEvents]);
      setMessage(result.message);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors || {},
        message: error.response?.data?.message || 'Could not create event'
      };
    }
  };

  const handleUpdate = async (id, eventData) => {
    try {
      const result = await updateEvent(id, buildEventPayload(eventData));
      setEvents((currentEvents) =>
        currentEvents.map((event) => (event._id === id ? result.data : event))
      );
      setSelectedEvent(result.data);
      setEditingEvent(null);
      setMessage(result.message);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        errors: error.response?.data?.errors || {},
        message: error.response?.data?.message || 'Could not update event'
      };
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Delete this event?');
    if (!shouldDelete) return;

    try {
      const result = await deleteEvent(id);
      setEvents((currentEvents) => currentEvents.filter((event) => event._id !== id));
      if (selectedEvent?._id === id) setSelectedEvent(null);
      if (editingEvent?._id === id) setEditingEvent(null);
      setMessage(result.message);
    } catch (error) {
      setMessage('Could not delete event');
    }
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">LNMIIT Sports Management</p>
          <h1>Sports Event Module</h1>
        </div>
        <span className="event-count">{events.length} Events</span>
      </header>

      {message && <div className="notice">{message}</div>}

      <section className="workspace">
        <div className="form-panel">
          {editingEvent ? (
            <EditEventForm
              event={editingEvent}
              onSubmit={handleUpdate}
              onCancel={() => setEditingEvent(null)}
            />
          ) : (
            <EventForm onSubmit={handleCreate} />
          )}
        </div>

        <div className="events-panel">
          <EventList
            events={events}
            loading={loading}
            onView={setSelectedEvent}
            onEdit={setEditingEvent}
            onDelete={handleDelete}
          />
        </div>
      </section>

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={(event) => {
            setEditingEvent(event);
            setSelectedEvent(null);
          }}
        />
      )}
    </main>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
