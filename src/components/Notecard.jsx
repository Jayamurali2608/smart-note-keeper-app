import {FaEdit,FaTrash} from "react-icons/fa";
function Notecard(){
    return (
        <div style={{backgroundcolor:"#fff8dc",padding:"20px",borderRadius:"10px",
            marginTop:"20px",boxShadow:"0 2px 5px rgba(0,0,0,0,2)", }}>
            <h3 style={{fontsize:"24px",marginbottom:"10px",}}>My First Note</h3>
            <p>This is My sample note</p>
            
            <span style={{backgroundcolor:"#4f46e5",color:"white",padding:"5px 10px"
                ,borderRadius:"20px",fontSize:"14px",display:"inline-block",marginTop:"10px",}}>Personal
           </span>
            <small>Updated:Today</small>
          
      <div style={{display: "flex",justifyContent: "space-between",alignItems: "center", marginTop: "15px",  }}>
       <small>Updated: Yesterday</small>

  <div><FaEdit
      style={{
        marginRight: "15px",
        cursor: "pointer",
      }}
    />

    <FaTrash
      style={{
        cursor: "pointer",
      }}
    />
  </div>
</div>
            
        </div>
    );
}
export default Notecard;