import Navbar from "../components/Navbar";
import { useState } from "react";
function Archive() {
  const [archivedNotes, setArchivedNotes] = useState(
    JSON.parse(localStorage.getItem("archivedNotes")) || []
  );

  // Restore 
  const handleRestore = (id) => {
    const noteToRestore = archivedNotes.find(
      (note) => note.id === id
    );
   const notes =
      JSON.parse(localStorage.getItem("notes")) || [];

     const updatedNotes = [...notes, noteToRestore];

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    const updatedArchive = archivedNotes.filter(
      (note) => note.id !== id
    );

    setArchivedNotes(updatedArchive);

    localStorage.setItem(
      "archivedNotes",
      JSON.stringify(updatedArchive)
    );
  };

  // Delete Permanently
  const handleDelete = (id) => {
    const updatedArchive = archivedNotes.filter(
      (note) => note.id !== id
    );

    setArchivedNotes(updatedArchive);

    localStorage.setItem(
      "archivedNotes",
      JSON.stringify(updatedArchive)
    );
  };

  // Empty Archive
  const handleEmptyArchive = () => {
    setArchivedNotes([]);
    localStorage.setItem(
      "archivedNotes",
      JSON.stringify([])
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "20px", width: "100%" }}>

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h1>Archived Notes</h1>
            <p>
              {archivedNotes.length} Notes in Archive
            </p>
          </div>

          <button
            onClick={handleEmptyArchive}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            📦 Empty Archive
          </button>
        </div>

        {/* No Notes */}
        {archivedNotes.length === 0 ? (
          <p>No archived notes found.</p>
        ) : (
          archivedNotes.map((note) => (
            <div
              key={note.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "20px",
                backgroundColor: "white",
              }}
            >
              <h3>{note.title}</h3>

              <p>{note.body}</p>

              <button
                onClick={() => handleRestore(note.id)}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                }}
              >
                Restore
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Archive;