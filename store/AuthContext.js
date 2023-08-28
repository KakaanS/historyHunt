import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const isAuthenticated = !!token;

  const authenticate = (tokenObject) => {
    setToken(tokenObject);
    AsyncStorage.setItem("appToken", JSON.stringify(tokenObject));
  };

  const logout = async () => {
    try {
      setToken(null);
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared after logout");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const value = {
    token,
    isAuthenticated,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
