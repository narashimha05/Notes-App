import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './authForm.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Save the token
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleSignup}>Sign Up</button>
      <h1><a href="/login">Login</a></h1>
    </div>
  );
}

export default SignUp;
