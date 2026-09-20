import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Settings.css";

function Settings() {
  const [selectedTab, setSelectedTab] = useState("account");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply saved theme when Settings page loads
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const tabs = [
    {
      id: "account",
      icon: "👤",
      title: "Account",
      description: "Manage your account",
    },
    {
      id: "preferences",
      icon: "⚙️",
      title: "Preferences",
      description: "Customize your experience",
    },
    {
      id: "notifications",
      icon: "🔔",
      title: "Notifications",
      description: "Manage alerts",
    },
    {
      id: "data",
      icon: "💾",
      title: "Data",
      description: "Manage your data",
    },
  ];

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;

    setTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      selectedTheme
    );
  };

  return (
    <div className="settings-layout">
      <Navbar />

      <main className="settings-page">

        {/* Header */}
        <section className="settings-header">

          <div className="settings-badge">
            <span>⚙️</span>
            PERSONALIZE YOUR EXPERIENCE
          </div>

          <h1>Settings</h1>

          <p>
            Manage your account, preferences, notifications
            and data from one place.
          </p>

        </section>

        {/* Settings Container */}
        <section className="settings-container">

          {/* Left Tabs */}
          <aside className="settings-tabs">

            <div className="tabs-title">
              <span>SETTINGS</span>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-tab ${
                  selectedTab === tab.id ? "active" : ""
                }`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <div className="tab-icon">
                  {tab.icon}
                </div>

                <div className="tab-text">
                  <strong>{tab.title}</strong>
                  <span>{tab.description}</span>
                </div>
              </button>
            ))}

          </aside>

          {/* Content */}
          <div className="settings-content">

            {/* Account */}
            {selectedTab === "account" && (
              <div className="settings-card">

                <div className="card-heading">
                  <div>
                    <h2>Account Settings</h2>

                    <p>
                      Update your personal account
                      information.
                    </p>
                  </div>
                </div>

                <div className="settings-divider"></div>

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <label>Change Password</label>

                  <input
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <button className="primary-btn">
                  Save Changes
                </button>

              </div>
            )}

            {/* Preferences */}
            {selectedTab === "preferences" && (
              <div className="settings-card">

                <div className="card-heading">
                  <div>
                    <h2>Preferences</h2>

                    <p>
                      Customize how SmartNotes works
                      for you.
                    </p>
                  </div>
                </div>

                <div className="settings-divider"></div>

                <div className="form-group">
                  <label>Auto Save Notes</label>

                  <select defaultValue="On">
                    <option value="On">On</option>
                    <option value="Off">Off</option>
                  </select>

                  <small>
                    Automatically save changes while
                    editing notes.
                  </small>
                </div>

                <div className="form-group">
                  <label>Default View</label>

                  <select defaultValue="Grid">
                    <option value="Grid">Grid</option>
                    <option value="List">List</option>
                  </select>

                  <small>
                    Choose how your notes are displayed.
                  </small>
                </div>

                <div className="form-group">
                  <label>Theme</label>

                  <select
                    value={theme}
                    onChange={handleThemeChange}
                  >
                    <option value="light">
                      ☀️ Light
                    </option>

                    <option value="dark">
                      🌙 Dark
                    </option>
                  </select>

                  <small>
                    Choose your preferred appearance.
                  </small>
                </div>

                <button className="primary-btn">
                  Save Preferences
                </button>

              </div>
            )}

            {/* Notifications */}
            {selectedTab === "notifications" && (
              <div className="settings-card">

                <div className="card-heading">
                  <div>
                    <h2>Notifications</h2>

                    <p>
                      Manage how SmartNotes keeps you
                      informed.
                    </p>
                  </div>
                </div>

                <div className="settings-divider"></div>

                <div className="notification-item">

                  <div className="notification-icon">
                    📧
                  </div>

                  <div className="notification-info">
                    <strong>Email Notifications</strong>

                    <span>
                      Receive important updates through
                      email.
                    </span>
                  </div>

                  <div className="status-on">
                    ON
                  </div>

                </div>

                <div className="notification-item">

                  <div className="notification-icon">
                    ⏰
                  </div>

                  <div className="notification-info">
                    <strong>Reminder Alerts</strong>

                    <span>
                      Get reminders for your important
                      notes.
                    </span>
                  </div>

                  <div className="status-on">
                    ON
                  </div>

                </div>

              </div>
            )}

            {/* Data */}
            {selectedTab === "data" && (
              <div className="settings-card">

                <div className="card-heading">
                  <div>
                    <h2>Data Management</h2>

                    <p>
                      Export or permanently remove your
                      SmartNotes data.
                    </p>
                  </div>
                </div>

                <div className="settings-divider"></div>

                {/* Export Data */}
                <div className="data-section">

                  <div className="data-section-heading">

                    <div className="data-icon">
                      📤
                    </div>

                    <div>
                      <h3>Export Data</h3>

                      <p>
                        Download all your notes and
                        settings as JSON.
                      </p>
                    </div>

                  </div>

                  <button className="primary-btn">
                    Export All Data
                  </button>

                </div>

                <div className="danger-divider"></div>

                {/* Danger Zone */}
                <div className="danger-zone">

                  <div className="danger-heading">

                    <div className="danger-icon">
                      ⚠️
                    </div>

                    <div>
                      <h3>Danger Zone</h3>

                      <p>
                        Permanently delete all your
                        SmartNotes data.
                      </p>
                    </div>

                  </div>

                  <button className="danger-btn">
                    🗑️ Delete All Data
                  </button>

                </div>

              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Settings;