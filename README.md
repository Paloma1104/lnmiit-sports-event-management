# LNMIIT Sports Event Management Module

## 1. Project Overview

This is a simple MERN stack module for managing sports events in an LNMIIT sports event management system. It allows a user to create, view, update, list, and delete sports events.

The project is intentionally beginner-to-intermediate friendly. It uses separate backend controllers, routes, model validation, frontend components, Axios API calls, and form validation, but avoids advanced tools such as Redux, TypeScript, authentication, Docker, payments, or complex roles.

## 2. Tech Stack

- Frontend: React, Axios, basic CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- ODM: Mongoose
- Build tool: Vite

## 3. Folder Structure

```text
backend/
  server.js
  package.json
  config/
    db.js
  models/
    Event.js
  routes/
    eventRoutes.js
  controllers/
    eventController.js
  middleware/
    validateEvent.js

frontend/
  index.html
  package.json
  src/
    App.jsx
    api/
      eventApi.js
    components/
      EventForm.jsx
      EventList.jsx
      EventCard.jsx
      EventDetails.jsx
      EditEventForm.jsx
    styles/
      App.css
    utils/
      validateEventForm.js
```

## 4. API Routes

Base URL:

```text
http://localhost:5000/api/events
```

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/events` | Create a new event |
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get one event by id |
| PUT | `/api/events/:id` | Update an event |
| DELETE | `/api/events/:id` | Delete an event |

Example event JSON:

```json
{
  "eventName": "Inter Hostel Football League",
  "sportName": "Football",
  "eventType": "Team",
  "description": "A football league for hostel teams conducted at the LNMIIT sports ground.",
  "eventDate": "2026-08-15",
  "venue": "Main Football Ground",
  "maxParticipants": 120,
  "organizerName": "Sports Committee",
  "contactEmail": "sports@lnmiit.ac.in",
  "status": "Upcoming"
}
```

## 5. How Validation Works

Validation is performed in two places:

- Frontend: `frontend/src/utils/validateEventForm.js`
- Backend: `backend/middleware/validateEvent.js` and `backend/models/Event.js`

Main validation rules:

- `eventName` must include letters and can use spaces and basic punctuation. Numbers are not allowed.
- `sportName` must contain only letters and spaces.
- `organizerName` must contain only letters and spaces.
- `venue` is required and cannot be only numbers.
- `eventDate` cannot be in the past.
- `maxParticipants` must be a whole number from 2 to 500.
- `contactEmail` must be a valid email format.
- `status` must be one of `Upcoming`, `Ongoing`, `Completed`, or `Cancelled`.
- `description` must be between 20 and 500 characters.

Frontend validation gives quick feedback beside form fields. Backend validation protects the database even if someone calls the API directly from Postman or another tool.

## 6. How To Run Backend And Frontend

### Prerequisites

- Node.js installed
- MongoDB installed and running locally, or a MongoDB Atlas connection string

### Backend

```bash
cd backend
npm install
npm run dev
```

By default, the backend connects to:

```text
mongodb://127.0.0.1:27017/lnmiit_sports_events
```

To use another database, create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

