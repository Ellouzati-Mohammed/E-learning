import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [Full_Name, setFull_Name] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);

      axios.get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setRole(res.data.role);
        setEmail(res.data.email);
        setFull_Name(res.data.Full_Name);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur d'authentification : ", err);
        logout();
        setLoading(false);
      });

    } else {
      setLoading(false);
    }
  }, []);

  const login = (data) => {
    const userToken = data.token;

    setToken(userToken);
    localStorage.setItem("authToken", userToken);

    axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      setRole(res.data.role);
      setEmail(res.data.email);
      setFull_Name(res.data.Full_Name);
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des infos utilisateur : ", err);
      logout();
    });
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setEmail(null);
    setFull_Name(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{ token, role, email, Full_Name, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
