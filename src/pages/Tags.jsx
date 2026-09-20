import Navbar from "../components/Navbar";
import "./Tags.css";

function Tags() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const tags = [
    ...new Set(
      notes
        .flatMap((note) => {
          if (Array.isArray(note.tag)) {
            return note.tag;
          }

          return note.tag ? [note.tag] : [];
        })
        .map((tag) => String(tag).trim())
        .filter(Boolean)
    ),
  ];

  const getTagColor = (tag) => {
    const name = tag.toLowerCase().trim();

    if (name === "personal") return "#16a34a";
    if (name === "work") return "#2563eb";
    if (name === "study") return "#dc2626";
    if (name === "projects") return "#f97316";
    if (name === "ideas") return "#7c3aed";
    if (name === "welcome") return "#0d9488";

    if (
      name === "getting-started" ||
      name === "getting started"
    ) {
      return "#db2777";
    }

    return "#6366f1";
  };

  const getColorName = (tag) => {
    const name = tag.toLowerCase().trim();

    if (name === "personal") return "Green";
    if (name === "work") return "Blue";
    if (name === "study") return "Red";
    if (name === "projects") return "Orange";
    if (name === "ideas") return "Violet";
    if (name === "welcome") return "Teal";

    if (
      name === "getting-started" ||
      name === "getting started"
    ) {
      return "Pink";
    }

    return "Purple";
  };

  const getNoteCount = (tag) => {
    return notes.filter((note) => {
      if (Array.isArray(note.tag)) {
        return note.tag.some(
          (item) =>
            String(item).toLowerCase().trim() ===
            tag.toLowerCase().trim()
        );
      }

      return (
        note.tag &&
        String(note.tag).toLowerCase().trim() ===
          tag.toLowerCase().trim()
      );
    }).length;
  };

  return (
    <div className="tags-layout">
      <Navbar />

      <main className="tags-page">

        {/* Page Header */}
        <section className="tags-header">

          <div className="tags-badge">
            <span></span>
            ORGANIZE WITH TAGS
          </div>

          <h1>Tags</h1>

          <p>
            Organize and discover your notes using tags.
          </p>

        </section>


        {/* Summary */}
        <section className="tags-summary">

          <div className="summary-item">

            <div className="summary-icon">
              🏷️
            </div>

            <div>
              <strong>{tags.length}</strong>

              <span>
                {tags.length === 1 ? "Tag" : "Tags"}
              </span>
            </div>

          </div>


          <div className="summary-divider"></div>


          <div className="summary-item">

            <div className="summary-icon">
              📝
            </div>

            <div>
              <strong>{notes.length}</strong>

              <span>
                {notes.length === 1 ? "Note" : "Notes"}
              </span>
            </div>

          </div>

        </section>


        {/* All Tags */}
        <section className="all-tags-section">

          <div className="section-heading">

            <h2>All Tags</h2>

            <p>
              View your tags and the notes connected to them.
            </p>

          </div>


          {tags.length > 0 ? (

            <div className="tags-table">

              {/* Table Header */}
              <div className="tags-table-header">

                <div>Tag</div>

                <div>Color</div>

                <div className="notes-header">
                  Notes
                </div>

              </div>


              {/* Table Rows */}
              {tags.map((tag) => {

                const noteCount = getNoteCount(tag);

                return (
                  <div
                    className="tags-table-row"
                    key={tag}
                  >

                    {/* Tag */}
                    <div className="table-tag-column">

                      <span
                        className="table-tag"
                        style={{
                          backgroundColor:
                            getTagColor(tag),
                        }}
                      >

                        <span className="tag-icon">
                          🏷️
                        </span>

                        <span>{tag}</span>

                      </span>

                    </div>


                    {/* Color */}
                    <div className="tag-color-column">

                      <span
                        className="color-dot"
                        style={{
                          backgroundColor:
                            getTagColor(tag),
                        }}
                      ></span>

                      <span>
                        {getColorName(tag)}
                      </span>

                    </div>


                    {/* Notes */}
                    <div className="tag-notes-column">

                      <span className="notes-count">
                        {noteCount}
                      </span>

                      <span>
                        {noteCount === 1
                          ? "Note"
                          : "Notes"}
                      </span>

                    </div>

                  </div>
                );
              })}

            </div>

          ) : (

            <div className="empty-tags">

              <div className="empty-tags-icon">
                🏷️
              </div>

              <h3>No tags yet</h3>

              <p>
                Add tags to your notes and they will
                appear here.
              </p>

            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default Tags;