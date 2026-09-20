import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import "./NoteEditor.css";

function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();

  const editNote = location.state?.note;

  const [title, setTitle] = useState(
    editNote?.title || ""
  );

  const [content, setContent] = useState(
    editNote?.body || ""
  );

  const [notebook, setNotebook] = useState(
    editNote?.notebook || ""
  );

  const [tag, setTag] = useState(
    Array.isArray(editNote?.tag)
      ? editNote.tag.join(", ")
      : editNote?.tag || ""
  );

  // LOAD NOTEBOOKS CREATED FROM NOTEBOOK PAGE
  const [notebooks] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("notebooks")
      ) || []
    );
  });

  const handleSave = () => {
    const oldNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    let updatedNotes;

    if (editNote) {
      updatedNotes = oldNotes.map((note) =>
        note.id === editNote.id
          ? {
              ...note,
              title: title,
              body: content,
              notebook: notebook,
              tag: tag
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
              updatedAt: new Date(),
            }
          : note
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: title,
        body: content,
        notebook: notebook,
        tag: tag
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      updatedNotes = [...oldNotes, newNote];
    }

    console.log("UPDATED NOTES:", updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    alert("Note saved successfully!");
    navigate("/notes");
  };

  return (
    <div className="editor-layout">
      <Navbar />

      <main className="note-editor-page">

        {/* TOP BAR */}

        <div className="editor-topbar">

          <button
            className="back-btn"
            onClick={() => navigate("/notes")}
          >
            ← <span>All Notes</span>
          </button>

          <div className="editor-actions">

            <button
              className="cancel-btn"
              onClick={() => navigate("/notes")}
            >
              Cancel
            </button>

            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Note
            </button>

            <button
              className="done-btn"
              onClick={handleSave}
            >
              Done
            </button>

          </div>

        </div>

        {/* EDITOR CONTENT */}

        <div className="editor-content">

          <div className="editor-heading">

            <span className="editor-label">
              {editNote ? "EDIT NOTE" : "NEW NOTE"}
            </span>

            <h1>
              {editNote
                ? "Edit your note"
                : "Create a new note"}
            </h1>

            <p>
              Write down your thoughts, ideas and
              everything you want to remember.
            </p>

          </div>

          {/* TITLE */}

          <div className="title-section">

            <input
              type="text"
              className="note-title-input"
              placeholder="Untitled Note"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          {/* WRITING AREA */}

          <div className="writing-card">

            <div className="writing-header">

              <span>📝</span>

              <span className="writing-label">
                Note Content
              </span>

            </div>

            <textarea
              className="note-content-input"
              placeholder="Start writing your note here..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
            />

            <div className="writing-footer">

              <span>
                {content.length} characters
              </span>

              <span>
                Auto saved locally
              </span>

            </div>

          </div>

          {/* OPTIONS */}

          <div className="note-options">

            {/* TAGS */}

            <div className="option-card">

              <div className="option-title">

                <div className="option-icon tag-icon">
                  🏷️
                </div>

                <div>

                  <h3>Tags</h3>

                  <p>
                    Add tags to organize your note
                  </p>

                </div>

              </div>

              <input
                type="text"
                className="option-input"
                placeholder="e.g. Work, Study, Ideas"
                value={tag}
                onChange={(e) =>
                  setTag(e.target.value)
                }
              />

              <small>
                Separate multiple tags with commas
              </small>

            </div>

            {/* NOTEBOOK */}

            <div className="option-card">

              <div className="option-title">

                <div className="option-icon notebook-icon">
                  📚
                </div>

                <div>

                  <h3>Notebook</h3>

                  <p>
                    Choose where to keep this note
                  </p>

                </div>

              </div>

              <select
                className="option-select"
                value={notebook}
                onChange={(e) =>
                  setNotebook(e.target.value)
                }
              >

                <option value="">
                  Select notebook
                </option>

                {notebooks.map(
                  (notebookName, index) => (
                    <option
                      key={index}
                      value={notebookName}
                    >
                      {notebookName}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default NoteEditor;