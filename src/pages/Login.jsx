import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://smartnotes-backend-0ns8.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);

      alert("Login successful");

      navigate("/profile");
    } else {
      alert(data.message || "Invalid login");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Cannot connect to backend server");
  }
};
 
  return (
    <div className="login-page">

      {/* Background Design */}
      <div className="bg-circle circle-one"></div>
      <div className="bg-circle circle-two"></div>
      <div className="bg-circle circle-three"></div>

      <div className="login-card">

        {/* Profile Icon */}
        <div className="profile-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
          </svg>
        </div>


        {/* Smart Note Keeper */}
        <div className="login-brand">

          <span className="brand-line"></span>

          <div className="brand-note">
            <div></div>
            <div></div>
            <div className="small-line"></div>
          </div>

          <h2>Smart Note Keeper</h2>

          <span className="brand-sparkle">✦</span>

          <span className="brand-line"></span>

        </div>


        {/* Welcome */}
        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to access your notes
        </p>


        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-group">

            <label>Email Address</label>

            <div className="input-box">

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


          {/* Password */}
          <div className="input-group">

            <div className="password-top">

              <label>Password</label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>

            </div>


            <div className="input-box">

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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />


              {/* Show / Hide Password */}
              <button
                type="button"
                className="eye-button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "◉" : "○"}
              </button>

            </div>
          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >
            SIGN IN
          </button>

        </form>


        {/* Signup */}
        <p className="signup-text">
          Don't have an account?{" "}

          <Link to="/signup">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;