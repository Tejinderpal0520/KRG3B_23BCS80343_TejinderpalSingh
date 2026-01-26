import { useAuth } from "../context/AuthContext";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // If already logged in, do NOT show login page
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = () => {
    setIsAuthenticated(true);

    const redirectTo = location.state?.from?.pathname || "/";
    navigate(redirectTo, { replace: true });
  };

  return (
    <>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login to EcoTrack</button>
    </>
  );
};

export default Login;
