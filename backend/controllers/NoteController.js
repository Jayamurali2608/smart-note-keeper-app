const Note = require("../models/Note");

// Create Note
const createNote = async (req, res, next) => {
  try {
    const { title, content, notebook, tags, color, pinned } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    console.log("REQ.USER:", req.user);
    console.log("REQ.USER.USERID:", req.user?.userId);

    const note = await Note.create({
      user: req.user.userId,
      title: title.trim(),
      content: content || "",
      notebook: notebook || "General",
      tags: tags || [],
      color: color || "#ffffff",
      pinned: pinned || false,
      lastEdited: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

// Get all notes of logged-in user
const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({
      user: req.user.userId,
      archived: false,
    }).sort({
      pinned: -1,
      lastEdited: -1,
    });

    res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// Get one note
const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    next(error);
  }
};

// Update note - also used for auto-save
const updateNote = async (req, res, next) => {
  try {
    const { title, content, notebook, tags, color, pinned } = req.body;

    const note = await Note.findById(req.params.id);

    console.log("FOUND NOTE:", note);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (title !== undefined) note.title = title.trim();
    if (content !== undefined) note.content = content;
    if (notebook !== undefined) note.notebook = notebook;
    if (tags !== undefined) note.tags = tags;
    if (color !== undefined) note.color = color;
    if (pinned !== undefined) note.pinned = pinned;

    // Server-side timestamp for every save
    note.lastEdited = new Date();

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle Pin
const togglePin = async (req, res, next) => {
  try {
    console.log("PIN NOTE ID:", req.params.id);
    console.log("PIN USER ID:", req.user.userId);

    const note = await Note.findOne({
  _id: req.params.id,
  user: req.user.userId,
});
    

    console.log("FOUND NOTE:", note);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    console.log("NOTE USER ID:", note.user.toString());

    if (note.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this note",
      });
    }

    note.pinned = !note.pinned;
    note.lastEdited = new Date();

    await note.save();

    res.status(200).json({
      success: true,
      message: note.pinned
        ? "Note pinned successfully"
        : "Note unpinned successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};

// Delete note
const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  togglePin,
};