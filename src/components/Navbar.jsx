import { Link } from "react-router-dom";
import"./Navbar.css";

function Navbar() {
  return (
    <div className="sidebar">
      <h2>Smart Notes</h2>
      <div className="profilr-icon">
        👤
      </div>
     <Link to="/editor">
      <button className="new-note-btn">+ New Note</button>
       </Link>
      <ul>
        <li><Link to="/notes">All Notes</Link></li>
        <li><Link to="/notebook">Notebooks</Link></li>
        <li><Link to="/Tags">Tags</Link></li>
        <li><Link to="/archive">Archive</Link></li>
        <li><Link to="/trash">Trash</Link></li>
        <li><Link to="/Settings">Settings</Link></li>
      
      </ul>
    </div>
  );
}

export default Navbar;