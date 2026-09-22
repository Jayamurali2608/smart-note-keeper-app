const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/NoteRoutes");
const notebookRoutes = require("./routes/NotebookRoutes");
const searchRoutes = require("./routes/searchRoutes");
const tagRoutes = require("./routes/tagRoutes");
const archiveRoutes = require("./routes/archiveRoutes");

dotenv.config();
const app = express();
connectDB();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smartnotes-frontend-741b.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(limiter);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes/search", searchRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/notes", archiveRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/notebooks", notebookRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Smart Note Keeper Backend is running",
  });
});

const PORT = process.env.PORT || 5000;
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});