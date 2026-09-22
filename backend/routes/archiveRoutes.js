const express = require("express");
const router = express.Router();

const {
  archiveNote,
  getArchivedNotes,
  restoreNote,
  permanentDeleteNote,

} = require("../controllers/archiveController");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/archive", authMiddleware, getArchivedNotes);
router.patch("/:id/archive", authMiddleware, archiveNote);
router.patch("/:id/restore", authMiddleware, restoreNote);
router.delete("/:id/permanent", authMiddleware, permanentDeleteNote);


module.exports = router;