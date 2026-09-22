const Notebook = require("../models/Notebook");

// Create Notebook
const createNotebook = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Notebook name is required",
      });
    }

    const notebook = await Notebook.create({
      name,
      user: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: "Notebook created successfully",
      notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Notebooks
const getNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      notebooks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Notebook
const updateNotebook = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Notebook name is required",
      });
    }

    const notebook = await Notebook.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      { name },
      { new: true }
    );

    if (!notebook) {
      return res.status(404).json({
        success: false,
        message: "Notebook not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notebook updated successfully",
      notebook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notebook
const deleteNotebook = async (req, res) => {
  try {
    const notebook = await Notebook.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!notebook) {
      return res.status(404).json({
        success: false,
        message: "Notebook not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notebook deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNotebook,
  getNotebooks,
  updateNotebook,
  deleteNotebook,
};