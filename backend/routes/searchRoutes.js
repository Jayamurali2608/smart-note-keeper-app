const express = require("express");
const router = express.Router();

const { searchNotes } = require("../controllers/searchController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, searchNotes);

module.exports = router;