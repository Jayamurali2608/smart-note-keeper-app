const express = require("express");
const router = express.Router();

const { getTags } = require("../controllers/tagController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getTags);

module.exports = router;