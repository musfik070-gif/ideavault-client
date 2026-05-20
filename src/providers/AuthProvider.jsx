import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ideaVaultUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);

    localStorage.setItem("ideaVaultUser", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);

    localStorage.removeItem("ideaVaultUser");
  };

  const authInfo = {
    user,
    setUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
