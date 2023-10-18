import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

export function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState(null);
  
  function authenticate(token) {
    setAuthToken(token);
    void AsyncStorage.setItem('token', token);
  }
  
  function logout() {
    setAuthToken(null);
    void AsyncStorage.removeItem('token');
  }
  
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
