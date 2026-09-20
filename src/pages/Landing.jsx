import { useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`landing-page ${darkMode ? "dark-mode" : ""}`}>

      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo">📝SmartNotes</div>

        <nav className="landing-nav">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <Link to="/login" className="landinglogin">Login</Link>

          <Link to="/signup" className="get-started">
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">

        <h1>AI-powered Notes Workspace</h1>

        <h2>Your thoughts, organized intelligently.</h2>

        <p>
          Create, organize, search, summarize, and share your notes
          — all in one smart workspace.
        </p>

        <div className="landing-buttons">
          <Link to="/signup" className="start-free">
            Start for Free
          </Link>

          <Link to="/login" className="landing-login">
            Login
          </Link>
        </div>

        {/* Feature Boxes */}
        <div className="feature-container">

          <div className="feature-box">
            <div className="feature-icon">✨</div>
            <h3>Notes</h3>
            <p>Create and organize your notes easily.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🤖</div>
            <h3>AI Insights</h3>
            <p>Get smart summaries and useful insights.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search</h3>
            <p>Find your notes quickly and easily.</p>
          </div>

          <div className="feature-box">
            <div className="feature-icon">🌐</div>
            <h3>Public Sharing</h3>
            <p>Share selected notes with others.</p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © SmartNotes
      </footer>

    </div>
  );
}

export default Landing;