import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const userData = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <h2 style={{fontsize:"22px",textAlign:"center"}}>Signup</h2>

        <input style={styles.input} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button style={styles.button}>Signup</button>
        <p style={{marginTop:"10px",textAlign:"center"}}>Already have an account?{""}
            <Link to="/login"style={{color:"green",textDecoration:"none"}}>Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2",
    fontfamily:"arial"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    fontsize:"16px" 
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontsize:"15px"
  },
  button: {
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontsize:"16px"

  },
};

export default Signup;