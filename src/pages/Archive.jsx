import Navbar from "../components/Navbar";
import { useState } from "react";
import "./Archive.css";

function Archive() {
  const [archivedNotes, setArchivedNotes] = useState(
    JSON.parse(localStorage.getItem("archivedNotes")) || []
  );

  // Restore note
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

  // Delete permanently
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

  // Empty archive
  const handleEmptyArchive = () => {
    if (archivedNotes.length === 0) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to empty the archive?"
    );

    if (!confirmDelete) return;

    setArchivedNotes([]);

    localStorage.setItem(
      "archivedNotes",
      JSON.stringify([])
    );
  };

  return (
    <div className="archive-layout">
      <Navbar />

      <main className="archive-page">

        {/* Header */}
        <section className="archive-header">

          <div className="archive-header-content">

            <div className="archive-badge">
              <span></span>
              KEEP YOUR NOTES SAFE
            </div>

            <h1>Archived Notes</h1>

            <p>
              Notes you've archived are stored here until you
              decide to restore or remove them.
            </p>

          </div>

          {archivedNotes.length > 0 && (
            <button
              className="empty-archive-btn"
              onClick={handleEmptyArchive}
            >
              <span>🗑️</span>
              Empty Archive
            </button>
          )}

        </section>


        {/* Summary */}
        <section className="archive-summary">

          <div className="archive-summary-item">

            <div className="archive-summary-icon">
              📦
            </div>

            <div>
              <strong>{archivedNotes.length}</strong>

              <span>
                {archivedNotes.length === 1
                  ? "Archived Note"
                  : "Archived Notes"}
              </span>
            </div>

          </div>

        </section>


        {/* Archived Notes */}
        {archivedNotes.length > 0 ? (

          <section className="archive-notes-section">

            <div className="archive-section-heading">

              <div>
                <h2>All Archived Notes</h2>

                <p>
                  Manage the notes you've moved to archive.
                </p>
              </div>

            </div>


            <div className="archive-grid">

              {archivedNotes.map((note) => (

                <article
                  className="archive-note-card"
                  key={note.id}
                >

                  <div className="archive-card-top">

                    <div className="archive-note-icon">
                      📝
                    </div>

                    <span className="archived-label">
                      ARCHIVED
                    </span>

                  </div>


                  <div className="archive-card-content">

                    <h3>
                      {note.title || "Untitled Note"}
                    </h3>

                    <p>
                      {note.body || "No content available."}
                    </p>

                  </div>


                  <div className="archive-card-actions">

                    <button
                      className="restore-btn"
                      onClick={() =>
                        handleRestore(note.id)
                      }
                    >
                      <span>↩</span>
                      Restore
                    </button>

                    <button
                      className="archive-delete-btn"
                      onClick={() =>
                        handleDelete(note.id)
                      }
                    >
                      <span>🗑️</span>
                      Delete
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>

        ) : (

          <section className="archive-empty">

            <div className="archive-empty-icon">
              📦
            </div>

            <span className="archive-empty-label">
              ALL CLEAR
            </span>

            <h2>No archived notes</h2>

            <p>
              Notes you archive will appear here.
              You can restore them anytime.
            </p>

          </section>

        )}

      </main>
    </div>
  );
}

export default Archive;