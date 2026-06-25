function AboutSection() {
  return (
    <div
      style={{
        marginTop: "15px",
        padding: "15px",
        borderTop: "1px solid #eee",
      }}
    >
      <h4 style={{ marginBottom: "10px" }}>About</h4>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", margin: "6px 0" }}>
        <span>Member since</span>
        <span>June 2026</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", margin: "6px 0" }}>
        <span>Last login</span>
        <span>Today</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", margin: "6px 0" }}>
        <span>Storage used</span>
        <span>120 MB</span>
      </div>
    </div>
  );
}

export default AboutSection;