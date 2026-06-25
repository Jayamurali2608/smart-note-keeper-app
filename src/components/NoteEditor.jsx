import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useLocation } from "react-router-dom";
function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const editNote = location.state?.note;
  const [title, setTitle] = useState(editNote?.title || "");
  const [content, setContent] = useState(editNote?.body || "");
  const [notebook, setNotebook] = useState(
  editNote?.notebook || ""
  );
const [tag, setTag] = useState(
editNote?.tag || ""
  );
 const handleSave = () => {
 const oldNotes =
 JSON.parse(localStorage.getItem("notes")) || [];
   let updatedNotes;
 if (editNote) {
    updatedNotes = oldNotes.map((note) =>
      note.id === editNote.id?{
              ...note,
              title: title,
              body: content,
              notebook: notebook,
              tag: tag.split(",").map(t=>t.trim()),
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
        tag: tag.split(",").map(t=>t.trim()),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      updatedNotes = [...oldNotes, newNote];
    }
    console.log("UPDATED NOTES:",updatedNotes);
    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    alert("Note saved successfully!");
    navigate("/notes");
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ flex: 1, padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
            gap: "10px",
          }}
        >
          <button
            onClick={() => navigate("/notes")}
            style={{
              backgroundColor: "#4F46E5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Done
          </button>

          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
            }}
          >
            Save Note
          </button>
        </div>

        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        <textarea
          placeholder="Start writing your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            width: "100%",
            height: "350px",
            padding: "10px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          {/* TAGS */}
          <div>
            <p>🏷️ Tags</p>

            <input
              type="text"
              placeholder="Add tag..."
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>

          {/* NOTEBOOK */}
          <div>
            <p>📚 Notebook</p>

            <select
              value={notebook}
              onChange={(e) =>
                setNotebook(e.target.value)
              }
            >
              <option value="">
                Select notebook
              </option>
              <option value="Personal">
                Personal
              </option>
              <option value="Work">
                Work
              </option>
              <option value="Study">
                Study
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteEditor;