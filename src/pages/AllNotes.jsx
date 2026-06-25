import Navbar from "../components/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
function AllNotes() {
  const location = useLocation();
  const selectedNotebook =
    location.state?.notebook || "";
  const navigate = useNavigate();
  const [notes, setNotes] = useState(() => {
    return JSON.parse(localStorage.getItem("notes")) || [];
  });

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [view, setView] = useState("grid");
  const getSortedNotes = () => {
    let sorted = [...notes];

    if (sortType === "recent") {
      sorted.sort((a, b) =>
          new Date(b.updatedAt) -
          new Date(a.updatedAt)
      );
    }

    if (sortType === "old") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }

    if (sortType === "title") {
      sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return sorted;
  };

  const getRelativeTime = (date) => {
  const now = new Date();
  const updatedDate = new Date(date);
  const diffTime = now - updatedDate;
  const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "yesterday";

    return `${diffDays} days ago`;
  };

  const handleDelete = (id) => {
    const noteToTrash = notes.find(
      (note) => note.id === id
    );

    const trashNotes =
      JSON.parse(
        localStorage.getItem("trashNotes")
      ) || [];

    const updatedTrash = [
      ...trashNotes,
      noteToTrash,
    ];

    localStorage.setItem(
      "trashNotes",
      JSON.stringify(updatedTrash)
    );

    const updated = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updated);

    localStorage.setItem(
      "notes",
      JSON.stringify(updated)
    );
  };

  const handleArchive = (id) => {
    const noteToArchive = notes.find(
      (note) => note.id === id
    );

    const archivedNotes =
      JSON.parse(
        localStorage.getItem("archivedNotes")
      ) || [];

    archivedNotes.push(noteToArchive);

    localStorage.setItem(
      "archivedNotes",
      JSON.stringify(archivedNotes)
    );

    const updatedNotes = notes.filter(
      (note) => note.id !== id
    );

    setNotes(updatedNotes);

    localStorage.setItem(
      "notes",
      JSON.stringify(updatedNotes)
    );
  };

  const handleEdit = (note) => {
    navigate("/editor", { state: { note } });
  };

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "20px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "60%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginLeft: "auto",
            }}
          >
            <button
              onClick={() =>
                navigate("/login")
              }
              style={{
                padding: "13px",
                borderRadius: "60%",
                background: "#4f46e5",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              👤
            </button>

            <Link to="/editor">
              <button
                style={{
                  padding: "15px",
                  borderRadius: "8px",
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                }}
              >
                + New Note
              </button>
            </Link>

            <select
              value={sortType}
              onChange={(e) =>
                setSortType(e.target.value)
              }
              style={{
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
              }}
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
              onClick={() => setView("grid")}
            >
              🔲
            </button>

            <button
              onClick={() => setView("list")}
            >
              ☰
            </button>
          </div>
        </div>

        <h1>All Notes</h1>

        <div
          style={{
            display:
              view === "grid"
                ? "grid"
                : "block",
            gridTemplateColumns:
              view === "grid"
                ? "repeat(3,1fr)"
                : "none",
            gap: "20px",
          }}
        >
          {getSortedNotes()
            .filter(
              (note) =>
                note.title
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  ) &&
                (!selectedNotebook ||
                  note.notebook ===
                    selectedNotebook)
            )
            .map((note) => {
              const tagValue =
                Array.isArray(note.tag)
                  ? note.tag[0]
                  : note.tag;

          return (
           <div
          key={note.id}
           onClick={() =>
           navigate(`/note/${note.id}`, {
           state: { note },
    })
  }
           style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "8px",
           backgroundColor: "white",
          cursor: "pointer",
      }}
     >
       <h3>{note.title}</h3>
        <p>{note.body}</p>

           {tagValue && (
            <p
                      style={{
                        display: "inline-block",
                        backgroundColor:
                          tagValue ?.toLowerCase().trim() ==="personal"
                            ? "green"
                            : tagValue?.toLowerCase().trim() ==="work"
                            ? "blue"
                            : tagValue
                                ?.toLowerCase().trim() ==="study"
                            ? "red"
                            : tagValue
                                ?.toLowerCase().trim() ==="ideas"
                            ? "blueviolet"
                            : tagValue?.toLowerCase().trim() ==="important"
                            ? "orange"
                            : "purple",

                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "15px",
                        fontSize: "14px",
                        marginTop: "10px",
                      }}
                    >
                      🏷️ {tagValue}
                    </p>
                  )}

                  <p
                    style={{
                      fontSize: "14px",
                      color: "blue",
                    }}
                  >
                    Last Updated:
                    {getRelativeTime(
                      note.updatedAt
                    )}
                  </p>

                  <div>
                    <button onClick={() => handleEdit(note)
                      }>
                      ✏️
                    </button>

                    <button onClick={() => handleArchive(note.id)
                      }
                      style={{marginLeft: "10px",}}
                    >
                      📦
                    </button>

                    <button onClick={() =>handleDelete(note.id)
                      }
                      style={{marginLeft: "10px",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default AllNotes;