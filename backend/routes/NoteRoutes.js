const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePin,
} = require("../controllers/NoteController");

const authMiddleware = require("../middleware/Authmiddleware");


// Create Note
router.post("/", authMiddleware, createNote);

// Get all notes
router.get("/", authMiddleware, getNotes);

// Get one note
router.get("/:id", authMiddleware, getNoteById);

// Update Note
router.put("/:id", authMiddleware, updateNote);

// Toggle Pin / Unpin
router.patch("/:id/pin", authMiddleware, togglePin);

// Delete Note
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;

