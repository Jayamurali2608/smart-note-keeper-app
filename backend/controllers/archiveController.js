const Note = require("../models/Note");
const archiveNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
      archived: false,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.archived = true;
    note.lastEdited = new Date();

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note archived successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};
const getArchivedNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({
      user: req.user.userId,
      archived: true,
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
const restoreNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user.userId,
      archived: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Archived note not found",
      });
    }

    note.archived = false;
    note.lastEdited = new Date();

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note restored successfully",
      note,
    });
  } catch (error) {
    next(error);
  }
};
const permanentDeleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
      archived: true,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Archived note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note permanently deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  archiveNote,
  getArchivedNotes,
  restoreNote,
  permanentDeleteNote,

};