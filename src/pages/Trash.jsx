import Navbar from "../components/Navbar";
import { useState } from "react";

function Trash() {
  const [trashNotes, setTrashNotes] = useState(
    JSON.parse(localStorage.getItem("trashNotes")) || []
  );

  // Restore Note
  const handleRestore = (id) => {
    const noteToRestore = trashNotes.find(
      (note) => note.id === id
    );

    const notes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const updatedNotes = [...notes, noteToRestore];

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    const updatedTrash = trashNotes.filter(
      (note) => note.id !== id
    );

    setTrashNotes(updatedTrash);

    localStorage.setItem(
      "trashNotes",
      JSON.stringify(updatedTrash)
    );
  };

  // Delete Permanently
  const handlePermanentDelete = (id) => {
    const updatedTrash = trashNotes.filter(
      (note) => note.id !== id
    );

    setTrashNotes(updatedTrash);

    localStorage.setItem(
      "trashNotes",
      JSON.stringify(updatedTrash)
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "25px", width: "100%" }}>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <div>
    <h1>Trash</h1>
    <p>{trashNotes.length} Notes in Trash</p>
  </div>

  <button
    onClick={() => {
      setTrashNotes([]);
      localStorage.setItem(
        "trashNotes",
        JSON.stringify([])
      );
    }}
    style={{
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
    }}
  >
    🗑️ Empty Trash
  </button>
</div>

        {trashNotes.length === 0 ? (
          <p>No deleted notes found.</p>
        ) : (
          trashNotes.map((note) => (
            <div
              key={note.id}
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "20px",
              }}
            >
              <h3>{note.title}</h3>
              <p>{note.body}</p>

              <button
                onClick={() => handleRestore(note.id)}
                style={{
                  backgroundColor: "blue",
                  marginRight: "15px",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Restore
              </button>

              <button
                onClick={() =>
                  handlePermanentDelete(note.id)
                }
                style={{
                  backgroundColor: "red",
                  padding: "10px",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Delete Permanently
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Trash;