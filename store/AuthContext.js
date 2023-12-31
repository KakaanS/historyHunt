import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  username: "",
  setUsername: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");

  const isAuthenticated = !!token;
  const authenticate = (token) => {
    setToken(token);
    AsyncStorage.setItem("appToken", token);
  };

  const logout = () => {
    setToken(null);
    AsyncStorage.removeItem("appToken");
  };

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,
    username,
    setUsername,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
