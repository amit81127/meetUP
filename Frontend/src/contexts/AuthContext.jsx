import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const client = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL || "http://localhost:8000"}/api/v1/users`,
    withCredentials: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // REGISTER
  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      return response.data.message;
    } catch (error) {
      return error?.response?.data?.message || "Registration failed";
    }
  };

  // LOGIN
  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      setUserData(user);
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(user));

      return response.data.message || "Login successful";
    } catch (error) {
      return error?.response?.data?.message || "Login failed";
    }
  };

  // LOGOUT
  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
