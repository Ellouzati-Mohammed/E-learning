import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // ou un spinner
  }

  if (!token) {
    return <Navigate to="/SignIn" replace />;
  }

  return children;
};

export default ProtectedRoute;
