import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
function Home() {
  return (
    <div style={{
      display:"flex",
      minHeight:"100vh"}}>
        <Navbar/>
        <div style={{flex:1,padding:"20px"}}>
</div>  
      {/*home page content*/}
      <h1>Home Page</h1>

      <Link to="/login">Go to Login</Link>
      <br /><br />

      <Link to="/signup">Go to Signup</Link>
      <br></br>

       <Link to="/notes">Go to All Notes</Link>
    </div>
  );
}

export default Home;