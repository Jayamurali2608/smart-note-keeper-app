import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
function Profile() {
  const user=JSON.parse(localStorage.getItem("user")) ||{};
  const notes =
    JSON.parse(localStorage.getItem("notes")) || [];
  const totalNotes = notes.length;
  const totalTags = [
    ...new Set(notes.map((note) => note.tag))
  ].filter(Boolean).length;

  const totalNotebooks = [
    ...new Set(notes.map((note) => note.notebook))
  ].filter(Boolean).length;

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div
        style={{
          width: "100%",
          padding: "30px",
          backgroundColor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        {/* PROFILE CARD */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            textAlign: "center",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          {/* PROFILE ICON */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#4f46e5",
              color: "white",
              fontSize: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto",
            }}
          >
            👤
          </div>

          <h2>{user.name||"guest user"}</h2>
          <p>{user.email ||"No Email"}</p>

          {/* EDIT BUTTON */}
          <button
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>

          {/* STATS */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <div>
              <h3>{totalNotes}</h3>
              <p>Notes</p>
            </div>

            <div>
              <h3>{totalNotebooks}</h3>
              <p>Notebooks</p>
            </div>

            <div>
              <h3>{totalTags}</h3>
              <p>Tags</p>
            </div>
          </div>
        </div>

        {/* 👇 ABOUT SECTION (BOTTOM) */}
        <div style={{ marginTop: "20px" }}>
          <AboutSection />
        </div>

      </div>
    </div>
  );
}

export default Profile;