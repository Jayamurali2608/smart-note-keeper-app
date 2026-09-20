import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./NoteDetail.css";

function NoteDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const note = location.state?.note;

  if (!note) {
    return (
      <div className="note-detail-empty">
        <h2>No Note Found</h2>
        <button onClick={() => navigate("/notes")}>
          Back to All Notes
        </button>
      </div>
    );
  }

  return (
    <div className="note-detail-layout">
      <Navbar />

      <main className="note-detail-page">

        <div className="note-detail-topbar">
          <div className="note-detail-label">
            NOTE DETAILS
          </div>

          <button
            className="note-detail-back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        <section className="note-detail-card">

          <div className="note-detail-header">
            <div>
              <span className="note-detail-small-label">
                YOUR NOTE
              </span>

              <h1>{note.title || "Untitled Note"}</h1>
            </div>
          </div>

          <div className="note-detail-info">
            <div className="note-info-item">
              <span>📁</span>
              <div>
                <small>Notebook</small>
                <strong>
                  {note.notebook || "General"}
                </strong>
              </div>
            </div>

            <div className="note-info-item">
              <span>🏷️</span>
              <div>
                <small>Tags</small>

                <div className="note-detail-tags">
                  {note.tag?.length > 0 ? (
                    note.tag.map((t, i) => (
                      <span key={i}>
                        #{t}
                      </span>
                    ))
                  ) : (
                    <strong>No tags</strong>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="note-detail-divider"></div>

          <article className="note-detail-content">
            <p>
              {note.body || "This note has no content."}
            </p>
          </article>

        </section>

      </main>
    </div>
  );
}

export default NoteDetail;