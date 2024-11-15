// Updated CustomerAuthContext.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { signInWithGoogle } from "../config/firebaseService";

export const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customer, setCustomer] = useState(null);

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      const isVerified = user.user.emailVerified;
      if (isVerified) {
        const token = await user.user.getIdToken();
        localStorage.setItem("username", user.user.displayName || "Người dùng");
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        setCustomer({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName || "Người dùng",
        });
      } else {
        throw new Error("Email chưa được xác thực.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      const token = await user.getIdToken();
      localStorage.setItem("username", user.displayName || "Người dùng");
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setCustomer({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Người dùng",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCustomer(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <CustomerAuthContext.Provider value={{ isAuthenticated, customer, login, loginWithGoogle, logout }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

CustomerAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
