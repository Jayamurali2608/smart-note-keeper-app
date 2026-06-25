import { useState } from "react";
import Navbar from "../components/Navbar";
function Settings() {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      <div
        style={{
          width: "100%",
          padding: "30px",
          backgroundColor: "#f4f6f9",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Settings</h1>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={() => setSelectedTab("account")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            👤 Account
          </button>

          <button
            onClick={() => setSelectedTab("preferences")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ⚙️ Preferences
          </button>

          <button
            onClick={() => setSelectedTab("notifications")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🔔 Notifications
          </button>

          <button
            onClick={() => setSelectedTab("data")}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            💾 Data
          </button>
        </div>

        {/* Account Setting */}
        {selectedTab === "account" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              margin: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Account Settings</h2>
            <hr />

            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            />

            <label>Change Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            />

            <button
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Save Changes
            </button>
          </div>
        )}

        {/* Preferences */}
        {selectedTab === "preferences" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              margin: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Preferences</h2>
            <hr />

            <label>Auto Save Notes</label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <option>On</option>
              <option>Off</option>
            </select>

            <label>Default View</label>
            <select
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <option>Grid</option>
              <option>List</option>
            </select>

            <button
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
              }}
            >
              Save Preferences
            </button>
          </div>
        )}

        {/* Notifications */}
        {selectedTab === "notifications" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              margin: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Notifications</h2>
            <hr />
            <p>📧 Email Notifications: ON</p>
            <p>⏰ Reminder Alerts: ON</p>
          </div>
        )}

        {/* Data section*/}
        {selectedTab === "data" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              margin: "auto",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h2>Data Management</h2>
            <h3 style={{marginTop:"20px"}}>Export Data</h3>
            <hr />
            <p style={{color:"gray"}}>Download all your notes and Settings as JSON.</p>

            <button
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor:"pointer",
                borderRadius: "8px",
                marginTop:"10px",
                marginBottom: "20px",
              }}
            >
              Export All Data
            </button>

            <hr />
             <h3 style={{color:"red",marginTop:"20px",
              }}>
               Danger Zone
               </h3>
               <p style={{color:"gray"}}>permanently delete all your data.</p>

               <button style={{
                backgroundColor: "red",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor:"pointer",
              }}
            >
              Delete All Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;