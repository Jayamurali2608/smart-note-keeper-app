import Navbar from "../components/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "./Allnotes.css";

function AllNotes() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedNotebook = location.state?.notebook || "";

  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [view, setView] = useState("grid");
  const [darkMode, setDarkMode] = useState(false);

  // Which note's 3-dot menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

  const getSortedNotes = () => {
    const sorted = [...notes];

    if (sortType === "recent") {
      sorted.sort((a, b) =>
          new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    }

    if (sortType === "old") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt) - new Date(b.createdAt)
      );
    }

    if (sortType === "title") {
      sorted.sort((a,b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }

    return sorted;
  };

  const getRelativeTime = (date) => {
    if (!date) return "Recently";

    const now = new Date();
    const updatedDate = new Date(date);

    const diffTime = now - updatedDate;
    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    return `${diffDays} days ago`;
  };

  const handleDelete = (id) => {
    const noteToTrash = notes.find(
      (note) => note.id === id
    );

    if (!noteToTrash) return;

    const trashNotes =
      JSON.parse(localStorage.getItem("trashNotes")) || [];

    localStorage.setItem(
      "trashNotes",
      JSON.stringify([...trashNotes, noteToTrash])
    );

    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    setOpenMenuId(null);
  };

  const handleArchive = (id) => {
    const noteToArchive = notes.find(
      (note) => note.id === id
    );

    if (!noteToArchive) return;

    const archivedNotes =
      JSON.parse(
        localStorage.getItem("archivedNotes")
      ) || [];

    localStorage.setItem(
      "archivedNotes",
      JSON.stringify([
        ...archivedNotes,
        noteToArchive,
      ])
    );

    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );

    setOpenMenuId(null);
  };

  const handleEdit = (note) => {
    setOpenMenuId(null);

    navigate("/editor", {
      state: { note },
    });
  };

  const filteredNotes = getSortedNotes().filter((note) => {
    const title = note.title || "";
    const body = note.body || "";

    const searchMatch =
      title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      body
        .toLowerCase()
        .includes(search.toLowerCase());

    const notebookMatch =
      !selectedNotebook ||
      note.notebook === selectedNotebook;

    return searchMatch && notebookMatch;
  });

  return (
    <div
      className={`all-notes-page ${
        darkMode ? "dark-mode" : ""
      }`}
    >
      <Navbar />

      <main className="all-notes-main">

        {/* TOP HEADER */}

        <header className="all-notes-header">

          <div>
            <p className="dashboard-label">
              SMARTNOTES
            </p>

            <h1>All Notes</h1>

            <p className="header-subtitle">
              Organize your thoughts, ideas and memories.
            </p>
          </div>

          <div className="header-right">

            <button
              className="theme-toggle"
              onClick={() =>
                setDarkMode(!darkMode)
              }
              title="Toggle theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              className="profile-circle"
              onClick={() =>
                navigate("/profile")
              }
              title="Profile"
            >
              👤
            </button>

          </div>

        </header>

        {/* TOOLBAR */}

        <section className="notes-toolbar">

          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search your notes..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <div className="toolbar-actions">

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value)
              }
              className="sort-select"
            >
              <option value="recent">
                Recently Updated
              </option>

              <option value="title">
                Title
              </option>

              <option value="old">
                Date Created
              </option>
            </select>

            <button
              className={`view-btn ${
                view === "grid" ? "selected" : ""
              }`}
              onClick={() => setView("grid")}
              title="Grid view"
            >
              ▦
            </button>

            <button
              className={`view-btn ${
                view === "list" ? "selected" : ""
              }`}
              onClick={() => setView("list")}
              title="List view"
            >
              ☰
            </button>

           <Link to="/editor" className="create-note-link">
           <button className="create-note-btn">
           <span>＋</span>New Note
    </button>
  </Link>

          </div>

        </section>

        {/* NOTE COUNT */}

        <div className="notes-info">

          <span>
            {filteredNotes.length}{" "}
            {filteredNotes.length === 1
              ? "note"
              : "notes"}
          </span>

          {selectedNotebook && (
            <span className="notebook-filter">
              📁 {selectedNotebook}
            </span>
          )}

        </div>

        {/* NOTES */}

        <section
          className={`notes-container ${
            view === "list" ? "list-view" : ""
          }`}
        >

          {filteredNotes.length === 0 ? (

            <div className="empty-notes">

              <div className="empty-icon">
                📝
              </div>

              <h2>No notes found</h2>

              <p>
                Start writing your first note and
                keep your ideas organized.
              </p>

              <Link to="/editor">
                <button className="empty-create-btn">
                  ＋ Create New Note
                </button>
              </Link>

            </div>

          ) : (

            filteredNotes.map((note) => {

              const tagValue =
                Array.isArray(note.tag)
                  ? note.tag[0]
                  : note.tag;

              const tagClass =
                tagValue
                  ?.toLowerCase()
                  .trim();

              return (
                <article
                  key={note.id}
                  className="note-card"
                  onClick={() => {
                    if (openMenuId !== null) {
                      setOpenMenuId(null);
                      return;
                    }

                    navigate(
                      `/note/${note.id}`,
                      {
                        state: { note },
                      }
                    );
                  }}
                >

                  {/* CARD TOP */}

                  <div className="note-card-top">

                    <div className="note-icon">
                      📝
                    </div>

                    {/* 3 DOT MENU */}

                    <div className="more-menu-wrapper">

                      <button
                        className="more-btn"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenMenuId(
                            openMenuId === note.id
                              ? null
                              : note.id
                          );
                        }}
                        title="More options"
                      >
                        ⋮
                      </button>

                      {openMenuId === note.id && (

                        <div
                          className="note-dropdown"
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                        >

                          <button
                            className="dropdown-item edit-item"
                            onClick={() =>
                              handleEdit(note)
                            }
                          >
                            <span>✏️</span>
                            <span>Edit</span>
                          </button>

                          <button
                            className="dropdown-item archive-item"
                            onClick={() =>
                              handleArchive(note.id)
                            }
                          >
                            <span>🗄️</span>
                            <span>Archive</span>
                          </button>

                          <button
                            className="dropdown-item delete-item"
                            onClick={() =>
                              handleDelete(note.id)
                            }
                          >
                            <span>🗑️</span>
                            <span>Delete</span>
                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                  {/* CARD CONTENT */}

                  <h2>
                    {note.title || "Untitled Note"}
                  </h2>

                  <p className="note-preview">
                    {note.body ||
                      "No content yet..."}
                  </p>

                  {/* CARD BOTTOM */}

                  <div className="note-card-bottom">

                    <div className="note-meta">

                      {tagValue && (
                        <span
                          className="note-tag"
                          data-tag={tagClass}
                        >
                          #{tagValue}
                        </span>
                      )}

                      <span className="updated-time">
                        {getRelativeTime(
                          note.updatedAt
                        )}
                      </span>

                    </div>

                  </div>

                </article>
              );
            })
          )}

        </section>

      </main>
    </div>
  );
}

export default AllNotes;