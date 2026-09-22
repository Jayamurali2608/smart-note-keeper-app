const Note = require("../models/Note");

// Search Notes
const searchNotes = async (req, res, next) => {
  try {
    const { q, tag, notebook } = req.query;
const keyword = q;

    const query = {
      user: req.user.userId,
      archived: false,
    };

    // Keyword search in title and content
    if (keyword && keyword.trim()) {
      query.$or = [
        { title: { $regex: keyword.trim(), $options: "i" } },
        { content: { $regex: keyword.trim(), $options: "i" } },
      ];
    }

    // Tag filter
    if (tag && tag.trim()) {
      query.tags = tag.trim();
    }

    // Notebook filter
    if (notebook && notebook.trim()) {
      query.notebook = notebook.trim();
    }

    const notes = await Note.find(query).sort({
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

module.exports = {
  searchNotes,
};