import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NotebookView.css";

function NotebookView() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const [notebooks, setNotebooks] = useState(
    JSON.parse(localStorage.getItem("notebooks")) || []
  );

  // CREATE NEW NOTEBOOK
  const handleNewNotebook = () => {
    const notebookName = prompt("Enter notebook name");

    if (!notebookName || !notebookName.trim()) {
      return;
    }

    const cleanName = notebookName.trim();

    // Check duplicate notebook
    if (
      notebooks.some(
        (notebook) =>
          notebook.toLowerCase() === cleanName.toLowerCase()
      )
    ) {
      alert("Notebook already exists!");
      return;
    }

    // Add new notebook without removing existing notebooks
    const updatedNotebooks = [
      ...notebooks,
      cleanName,
    ];

    setNotebooks(updatedNotebooks);

    localStorage.setItem(
      "notebooks",
      JSON.stringify(updatedNotebooks)
    );
  };

  // DELETE NOTEBOOK
  const handleDeleteNotebook = (notebookName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${notebookName}" notebook?`
    );

    if (!confirmDelete) {
      return;
    }

    // Remove ONLY the selected notebook
    const updatedNotebooks = notebooks.filter(
      (notebook) => notebook !== notebookName
    );

    setNotebooks(updatedNotebooks);

    localStorage.setItem(
      "notebooks",
      JSON.stringify(updatedNotebooks)
    );

    // Keep notes safe.
    // Only remove the deleted notebook association.
    const updatedNotes = notes.map((note) => {
      if (note.notebook === notebookName) {
        return {
          ...note,
          notebook: "",
        };
      }

      return note;
    });

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    alert("Notebook deleted successfully!");
  };

  // Only manually created notebooks are displayed.
  // Notes will NOT recreate a deleted notebook.
  const allNotebooks = [...notebooks];

  return (
    <div className="notebook-layout">
      <Navbar />

      <main className="notebook-page">

        {/* PAGE HEADER */}
        <section className="notebook-hero">

          <div className="notebook-hero-content">

            <div className="notebook-badge">
              <span>✦</span>
              ORGANIZE YOUR NOTES
            </div>

            <h1>My Notebooks</h1>

            <p>
              Keep your notes organized, grouped and easy to find.
            </p>

          </div>

        </section>


        {/* TOOLBAR */}
        <section className="notebook-toolbar">

          {/* SUMMARY */}
          <div className="notebook-summary">

            <div className="summary-item">

              <div className="summary-icon">
                📚
              </div>

              <div className="summary-text">

                <strong>
                  {allNotebooks.length}
                </strong>

                <span>
                  {allNotebooks.length === 1
                    ? "Notebook"
                    : "Notebooks"}
                </span>

              </div>

            </div>


            <div className="summary-divider"></div>


            <div className="summary-item">

              <div className="summary-icon notes-summary-icon">
                📝
              </div>

              <div className="summary-text">

                <strong>
                  {notes.length}
                </strong>

                <span>
                  {notes.length === 1
                    ? "Note"
                    : "Notes"}
                </span>

              </div>

            </div>

          </div>


          {/* NEW NOTEBOOK */}
          <button
            className="new-notebook-btn"
            onClick={handleNewNotebook}
          >

            <span className="new-notebook-icon">
              +
            </span>

            <span>
              New Notebook
            </span>

          </button>

        </section>


        {/* NOTEBOOKS */}
        {allNotebooks.length > 0 ? (

          <section className="notebook-section">

            <div className="section-heading">

              <div>

                <h2>
                  All Notebooks
                </h2>

                <p>
                  Your notes are grouped here.
                </p>

              </div>

            </div>


            <div className="notebook-grid">

              {allNotebooks.map(
                (notebook, index) => {

                  const noteCount =
                    notes.filter(
                      (note) =>
                        note.notebook === notebook
                    ).length;

                  return (

                    <article
                      className="notebook-card"
                      key={index}
                    >

                      <div className="card-glow"></div>


                      {/* CARD TOP */}
                      <div className="notebook-card-top">

                        <div className="notebook-folder-icon">
                          <span>
                            📚
                          </span>
                        </div>


                        <button
                          className="notebook-more"
                          aria-label="Delete notebook"
                          onClick={() =>
                            handleDeleteNotebook(
                              notebook
                            )
                          }
                        >
                          ⋮
                        </button>

                      </div>


                      {/* CARD CONTENT */}
                      <div className="notebook-card-content">

                        <span className="card-label">
                          NOTEBOOK
                        </span>

                        <h3>
                          {notebook}
                        </h3>


                        <div className="note-count">

                          <span className="small-note-icon">
                            📝
                          </span>

                          <span>
                            {noteCount}{" "}
                            {noteCount === 1
                              ? "note"
                              : "notes"}
                          </span>

                        </div>

                      </div>


                      {/* OPEN BUTTON */}
                      <button
                        className="open-notebook-btn"
                        onClick={() =>
                          navigate(
                            `/notes?notebook=${encodeURIComponent(
                              notebook
                            )}`
                          )
                        }
                      >

                        <span>
                          Open Notebook
                        </span>

                        <span className="open-arrow">
                          →
                        </span>

                      </button>

                    </article>

                  );
                }
              )}

            </div>

          </section>

        ) : (

          /* EMPTY STATE */
          <section className="notebook-empty">

            <div className="empty-icon-wrapper">

              <div className="empty-notebook-icon">
                📚
              </div>

            </div>


            <span className="empty-label">
              GET STARTED
            </span>


            <h2>
              Create your first notebook
            </h2>


            <p>
              Organize your notes into separate notebooks
              and keep everything easy to manage.
            </p>


            <button
              className="empty-create-btn"
              onClick={handleNewNotebook}
            >

              <span>
                +
              </span>

              Create Notebook

            </button>

          </section>

        )}

      </main>
    </div>
  );
}

export default NotebookView;