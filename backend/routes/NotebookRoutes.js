const express = require("express");
const router = express.Router();

const {
  createNotebook,
  getNotebooks,
  updateNotebook,
  deleteNotebook,
} = require("../controllers/NotebookController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createNotebook);
router.get("/", authMiddleware, getNotebooks);
router.put("/:id", authMiddleware, updateNotebook);
router.delete("/:id", authMiddleware, deleteNotebook);

module.exports = router;