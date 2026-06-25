import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function NotebookView() {
  const navigate = useNavigate();
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const [notebooks, setNotebooks] = useState(
    JSON.parse(localStorage.getItem("notebooks")) || []
  );
const handleNewNotebook = () => {
const notebookName = prompt("Enter notebook name");

if (notebookName) {
  const updated = [...notebooks, notebookName];

      setNotebooks(updated);
      localStorage.setItem("notebooks",
           JSON.stringify(updated)
      );
    }
  };

  const allNotebooks = Array.from(
    new Set([
      ...notebooks,
      ...notes.map((note) => note.notebook).filter(Boolean),
    ])
  );

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "20px", width: "100%" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Notebooks</h1>

          {/* BUTTON TAG */}
          <button
            className="new-notebook-btn"
            onClick={handleNewNotebook}
          >
            + New Notebook
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {allNotebooks.map((notebook, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                borderRadius: "8px",
                background: "white",
              }}
            >
              <h3>📚 {notebook}</h3>

              <p>
                {
                  notes.filter(
                    (note) => note.notebook === notebook
                  ).length
                }{" "}
                Notes
              </p>

              <button onClick={() => navigate("/notes")}>
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotebookView;