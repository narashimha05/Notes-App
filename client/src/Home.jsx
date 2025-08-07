import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="homeContainer">
      <div className="homeContent">
        <h1>Welcome to Notes App 📝</h1>
        <p>A simple and secure place to save your notes online.</p>
        <div className="homeButtons">
          <Link to="/login" className="btn loginBtn">Log In</Link>
          <Link to="/signup" className="btn signupBtn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
