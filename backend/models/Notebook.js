const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "#ffffff",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notebook", notebookSchema);