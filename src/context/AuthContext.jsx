/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import  { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
