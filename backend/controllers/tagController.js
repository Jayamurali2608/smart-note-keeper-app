const Note = require("../models/Note");

// Get all tags used by logged-in user
const getTags = async (req, res, next) => {
  try {
    const notes = await Note.find(
      {
        user: req.user.userId,
        tags: { $exists: true, $ne: [] },
      },
      { tags: 1 }
    );

    const tags = [...new Set(notes.flatMap((note) => note.tags))];

    res.status(200).json({
      success: true,
      count: tags.length,
      tags,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTags,
};