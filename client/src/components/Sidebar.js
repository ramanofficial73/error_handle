import React from "react";
import { Link } from "react-router-dom";
import './Sidebar.css'
export default function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar_elemet">
        <h3>Settings</h3>{" "}
      </div>

      <div className="sidebar_elemet">
        <Link to="/updateName">Change Name</Link>
      </div>

      <div className="sidebar_elemet">
        <Link to="/updatePassword">Change Password</Link>
      </div>

      <div className="sidebar_elemet">
        <Link>Email Id</Link>
      </div>
      <div className="sidebar_elemet">
        <Link>Phone No.</Link>
      </div>
     
    </div>
  );
}
