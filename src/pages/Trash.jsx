import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Trash.css";

function Trash() {
  const [trashNotes, setTrashNotes] = useState(
    JSON.parse(localStorage.getItem("trashNotes")) || []
  );

  // Restore note
  const handleRestore = (id) => {
    const noteToRestore = trashNotes.find(
      (note) => note.id === id
    );

    if (!noteToRestore) return;

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

  // Delete permanently
  const handlePermanentDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this note?"
    );

    if (!confirmDelete) return;

    const updatedTrash = trashNotes.filter(
      (note) => note.id !== id
    );

    setTrashNotes(updatedTrash);

    localStorage.setItem(
      "trashNotes",
      JSON.stringify(updatedTrash)
    );
  };

  // Empty trash
  const handleEmptyTrash = () => {
    if (trashNotes.length === 0) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete all notes in Trash?"
    );

    if (!confirmDelete) return;

    setTrashNotes([]);

    localStorage.setItem(
      "trashNotes",
      JSON.stringify([])
    );
  };

  return (
    <div className="trash-layout">
      <Navbar />

      <main className="trash-page">

        {/* Header */}
        <section className="trash-header">

          <div className="trash-header-content">

            <div className="trash-badge">
              <span></span>
              RECENTLY DELETED
            </div>

            <h1>Trash</h1>

            <p>
              Deleted notes are kept here until you restore
              them or permanently remove them.
            </p>

          </div>

          <div className="trash-header-actions">

            {trashNotes.length > 0 && (
              <button
                className="empty-trash-btn"
                onClick={handleEmptyTrash}
              >
                <span>🗑️</span>
                Empty Trash
              </button>
            )}

          </div>

        </section>

        {/* Trash Summary */}
        <section className="trash-summary">

          <div className="trash-summary-item">

            <div className="trash-summary-icon">
              🗑️
            </div>

            <div>
              <strong>{trashNotes.length}</strong>

              <span>
                {trashNotes.length === 1
                  ? "Deleted Note"
                  : "Deleted Notes"}
              </span>
            </div>

          </div>

        </section>

        {/* Deleted Notes */}
        {trashNotes.length > 0 ? (

          <section className="trash-notes-section">

            <div className="trash-section-heading">

              <div>
                <h2>Deleted Notes</h2>

                <p>
                  Restore a note or permanently delete it.
                </p>
              </div>

            </div>

            <div className="trash-grid">

              {trashNotes.map((note) => (

                <article
                  className="trash-note-card"
                  key={note.id}
                >

                  <div className="trash-card-top">

                    <div className="trash-note-icon">
                      📝
                    </div>

                    <span className="deleted-label">
                      DELETED
                    </span>

                  </div>

                  <div className="trash-card-content">

                    <h3>
                      {note.title || "Untitled Note"}
                    </h3>

                    <p>
                      {note.body || "No content available."}
                    </p>

                  </div>

                  <div className="trash-card-actions">

                    <button
                      className="trash-restore-btn"
                      onClick={() =>
                        handleRestore(note.id)
                      }
                    >
                      <span>↩</span>
                      Restore
                    </button>

                    <button
                      className="permanent-delete-btn"
                      onClick={() =>
                        handlePermanentDelete(note.id)
                      }
                    >
                      <span>🗑️</span>
                      Delete Permanently
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>

        ) : (

          /* Empty Trash */
          <section className="trash-empty">

            <div className="trash-empty-icon">
              🗑️
            </div>

            <span className="trash-empty-label">
              ALL CLEAR
            </span>

            <h2>Trash is empty</h2>

            <p>
              Deleted notes will appear here.
              You can restore them before permanently
              deleting them.
            </p>

          </section>

        )}

      </main>
    </div>
  );
}

export default Trash;