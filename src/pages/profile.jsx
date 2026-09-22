import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

  const [notesCount, setNotesCount] = useState(0);
  const [notebooksCount, setNotebooksCount] = useState(0);
  const [tagsCount, setTagsCount] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const notes =
      JSON.parse(localStorage.getItem("notes")) || [];

    setNotesCount(notes.length);

    // NOTEBOOK COUNT
    const notebooks =
      JSON.parse(localStorage.getItem("notebooks")) || [];

    setNotebooksCount(notebooks.length);

    // TAG COUNT
    const uniqueTags = new Set();

    notes.forEach((note) => {
      if (Array.isArray(note.tag)) {
        note.tag.forEach((tag) => {
          if (tag) {
            uniqueTags.add(tag.trim());
          }
        });
      } else if (note.tag) {
        uniqueTags.add(note.tag.trim());
      }
    });

    setTagsCount(uniqueTags.size);

    fetch("https://smartnotes-backend-0ns8.onrender.com/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.user) {
          setUser(data.user);
          setName(data.user.name || "");
          setEmail(data.user.email || "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // EDIT PROFILE
  const handleEdit = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditing(true);
  };

  // CANCEL EDIT
  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  // SAVE PROFILE
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      alert("Please enter both name and email.");
      return;
    }

    setUser({
      ...user,
      name: name,
      email: email,
    });

    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  // LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href =
      "/smart-note-keeper-app/login";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <Navbar />

      <main
        style={{
          flex: 1,
          padding: "35px",
          background: "#f5f7fb",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >

        <h1
          style={{
            color: "#1e3a8a",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            color: "#64748b",
            textAlign: "center",
            marginTop: "25px",
            marginBottom: "25px",
          }}
        >
          Manage your SmartNotes account
        </p>

        <div
          style={{
            maxWidth: "850px",
            margin: "25px auto",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "15px",
            }}
          >

            <div
              style={{
                width: "85px",
                height: "85px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#2563eb,#4f46e5)",
                color: "white",
                fontSize: "38px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              👤
            </div>

            <div>

              <h2
                style={{
                  margin: "0 0 8px",
                  color: "#1e293b",
                }}
              >
                {user?.name || "Loading..."}
              </h2>

              <p
                style={{
                  margin: "5px 0",
                  color: "#64748b",
                }}
              >
                ✉️ {user?.email || "Loading..."}
              </p>

              <span
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  background: "#dcfce7",
                  color: "#15803d",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                ✓ Active Account
              </span>

            </div>

          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "15px",
              marginTop: "30px",
            }}
          >

            {/* TOTAL NOTES */}
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>📝</div>

              <h3>{notesCount}</h3>
              <p>Total Notes</p>
            </div>

            {/* NOTEBOOKS */}
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>📚</div>

              <h3>{notebooksCount}</h3>

              <p>Notebooks</p>
            </div>

            {/* TAGS */}
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                background: "#f8fafc",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div>🏷️</div>

              <h3>{tagsCount}</h3>

              <p>Tags</p>
            </div>

          </div>

        </div>

        {/* ACCOUNT INFORMATION */}

        <div
          style={{
            maxWidth: "850px",
            margin: "25px auto",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >

          <h2
            style={{
              color: "#1e3a8a",
              marginTop: 0,
            }}
          >
            Account Information
          </h2>

          {isEditing ? (

            <div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  👤 Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                    color: "#334155",
                  }}
                >
                  ✉️ Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px",
                    fontSize: "15px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "flex-end",
                  marginTop: "25px",
                }}
              >

                <button
                  onClick={handleCancel}
                  style={{
                    padding: "11px 24px",
                    background: "#e2e8f0",
                    color: "#334155",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  style={{
                    padding: "11px 24px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  💾 Save Changes
                </button>

              </div>

            </div>

          ) : (

            <div>

              <div
                style={{
                  padding: "15px 0",
                  borderBottom:
                    "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>👤 Full Name</span>

                <strong>
                  {user?.name || "Loading..."}
                </strong>
              </div>

              <div
                style={{
                  padding: "15px 0",
                  borderBottom:
                    "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>✉️ Email Address</span>

                <strong>
                  {user?.email || "Loading..."}
                </strong>
              </div>

              <div
                style={{
                  padding: "15px 0",
                  borderBottom:
                    "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>🔐 Security</span>

                <strong>
                  Password Protected
                </strong>
              </div>

              <div
                style={{
                  padding: "15px 0",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>✨ Status</span>

                <strong>
                  Active
                </strong>
              </div>

              <div
                style={{
                  marginTop: "25px",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >

                <button
                  onClick={handleEdit}
                  style={{
                    padding: "12px 25px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    padding: "12px 25px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  🚪 Logout
                </button>

              </div>

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Profile;