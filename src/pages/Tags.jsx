import Navbar from "../components/Navbar";
function Tags() {
  const notes =
    JSON.parse(localStorage.getItem("notes")) || [];

  const tags = [
    ...new Set(
      notes
        .map((note) =>
          Array.isArray(note.tag)?note.tag[0]:note.tag)
        .filter((tag) => tag)
    ),
  ];

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Tags</h1>

        {/* Tag Cloud */}
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "white",
          }}
        >
          <h3>Tag Cloud</h3>

          <div style={{ marginTop: "15px" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-block",
                  margin: "10px",
                  padding: "8px 15px",
                  borderRadius: "20px",
                  backgroundColor:
                    tag?.toLowerCase().trim() === "personal"
                      ? "green"
                      : tag?.toLowerCase().trim() === "work"
                      ? "blue"
                      : tag?.toLowerCase().trim() === "study"
                      ? "red"
                      : tag?.toLowerCase().trim() === "ideas"
                      ? "blueviolet"
                      : tag?.toLowerCase().trim() === "Welcome"
                      ? "orange"
                      :tag?.toLowerCase().trim()==="getting started"
                      ? "yellowgreen"
                      : "purple",
                  color: "white",
                }}
              >
                🏷️ {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tags Table */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              backgroundColor: "#f3f4f6",
              padding: "15px",
              fontWeight: "bold",
            }}
          >
            <div>Tag</div>
            <div>color</div>
            <div>Notes</div>
          </div>

          {/* Table Rows */}
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                padding: "15px",
                borderTop: "1px solid #ddd",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 15px",
                    borderRadius: "20px",
                    backgroundColor:
               tag?.toLowerCase().trim() === "personal"
                ? "green"
               : tag?.toLowerCase().trim() === "work"
                ? "blue"
              : tag?.toLowerCase().trim() === "study"
              ? "red"
               : tag?.toLowerCase().trim() === "ideas"
               ? "blueviolet"
              : tag?.toLowerCase().trim() === "projects"
             ? "orange"
             : tag?.toLowerCase().trim() === "welcome"
             ? "teal"
            : tag?.toLowerCase().trim() === "getting-started"
             ? "deeppink"
                 : "purple",
                    color: "white",
                  }}
                >
                  🏷️ {tag}
                </span>
              </div>
            <div>
                  <div>
                   {tag === "personal"
                   ? "🟢 Green"
                   : tag === "work"
                   ? "🔵 Blue"
                  : tag === "study"
                   ? "🔴 Red"
                  : tag === "projects"
                  ? "🟠 Orange"
                  : tag === "ideas"
                  ? "🟣 Violet"
                  : tag === "welcome"
                  ? "🟦 Teal"
                  : tag === "getting-started"
                  ? "🌸 Pink"
                  : "🟣 Purple"}
           </div>  
                  </div> 
              <div>
                {
                  notes.filter(
                    (note) => note.tag === tag
                  ).length
                }{" "}
                Notes
              </div>
               
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags;