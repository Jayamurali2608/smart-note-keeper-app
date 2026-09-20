import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? "☰" : "☰"}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>

        <div className="sidebar-header">
          <h2>Smart Notes</h2>

          
        </div>

        {/* Profile */}
        <Link
          to="/profile"
          className="profile-link"
          onClick={() => setIsOpen(false)}
        >
          <div className="profile-icon">👤</div>
        </Link>

        {/* New Note */}
        <Link
          to="/editor"
          onClick={() => setIsOpen(false)}
        >
          <button className="new-note-btn">
            + New Note
          </button>
        </Link>

        {/* Menu */}
        <ul>
          <li>
            <Link to="/notes" onClick={() => setIsOpen(false)}>
              📝 <span>All Notes</span>
            </Link>
          </li>

          <li>
            <Link to="/notebook" onClick={() => setIsOpen(false)}>
              📚 <span>Notebooks</span>
            </Link>
          </li>

          <li>
            <Link to="/Tags" onClick={() => setIsOpen(false)}>
              🏷️ <span>Tags</span>
            </Link>
          </li>

          <li>
            <Link to="/archive" onClick={() => setIsOpen(false)}>
              🗄️ <span>Archives</span>
            </Link>
          </li>

          <li>
            <Link to="/trash" onClick={() => setIsOpen(false)}>
              🗑️ <span>Trash</span>
            </Link>
          </li>

          <li>
            <Link to="/Settings" onClick={() => setIsOpen(false)}>
              ⚙️ <span>Settings</span>
            </Link>
          </li>
        </ul>

      </div>
    </>
  );
}

export default Navbar;