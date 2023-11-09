import React from "react";
import "../assets/css/sidebar.css";

export default function Sidebar({ handleSidebarToggle }) {
  return (
    <div className="sidebar">
      <div className="sidebar-background"></div>
      <div className="sidebar-content">
        <button
        onClick={handleSidebarToggle}>Close</button>
        Sidebar
      </div>
    </div>
  );
}
