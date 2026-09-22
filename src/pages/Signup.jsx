import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://smartnotes-backend-0ns8.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Cannot connect to backend server");
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-circle circle-one"></div>
      <div className="signup-circle circle-two"></div>
      <div className="signup-circle circle-three"></div>

      <div className="signup-card">

        {/* Profile Icon */}
        <div className="signup-profile-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
          </svg>
        </div>

        {/* Brand */}
        <div className="signup-brand">
          <div className="signup-note-icon">
            <div></div>
            <div></div>
            <div className="short-line"></div>
          </div>

          <h2>SmartNotes</h2>
          <span className="signup-sparkle">✦</span>
        </div>

        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Create your account and start organizing your notes
        </p>

        <form onSubmit={handleSignup}>

          {/* Name + Email */}
          <div className="signup-form-row">

            <div className="signup-input-group">
              <label>Full Name</label>

              <div className="signup-input-box">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="3.5" />
                  <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
                </svg>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="signup-input-group">
              <label>Email Address</label>

              <div className="signup-input-box">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

          </div>

          {/* Password + Confirm Password */}
          <div className="signup-form-row">

            <div className="signup-input-group">
              <label>Password</label>

              <div className="signup-input-box">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="signup-eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

            <div className="signup-input-group">
              <label>Confirm Password</label>

              <div className="signup-input-box">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                  />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                </svg>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="signup-eye-button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "◉" : "○"}
                </button>
              </div>
            </div>

          </div>

          <button type="submit" className="signup-button">
            Create Account
          </button>

        </form>

        <p className="signup-login-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;