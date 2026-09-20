# SmartNotes - Note Keeper App

SmartNotes is a MERN stack note-taking application that allows users to securely create, manage, organize, search, archive, restore, and delete their notes.

## Features

- User Signup and Login
- JWT Authentication
- Password Hashing with bcrypt
- Protected API Routes
- Create, Read, Update and Delete Notes
- Auto-update `lastEdited` timestamp
- Create and Manage Notebooks
- Tags and Smart Search
- Pin and Unpin Notes
- Archive and Restore Notes
- Permanent Delete for Archived Notes
- User-specific Notes
- CORS Configuration
- API Rate Limiting
- Central Error Handling

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
SmartNotes/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    ├── .env.example
    ├── server.js
    └── package.json