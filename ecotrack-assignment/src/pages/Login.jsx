import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (!username.trim()) return;
    localStorage.setItem("token", "ecotrack-user");
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>EcoTrack</h1>
        <p>Track your daily hydration</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;