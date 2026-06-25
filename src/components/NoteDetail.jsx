import { useLocation, useNavigate } from "react-router-dom";
function NoteDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const note = location.state?.note;
  if (!note) {
    return <p>No Note Found</p>;
  }
  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>
     <h1>{note.title}</h1>
     <p>{note.body}</p>

      <p>📁 {note.notebook}</p>

      <div>
        {note.tag?.map((t, i) => (
          <span key={i}>#{t} </span>
        ))}
      </div>

    </div>
  );
}
export default NoteDetail;