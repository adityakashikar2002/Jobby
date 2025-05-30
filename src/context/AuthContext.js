// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Added user state
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('jobby_jwt');
//     if (token) {
//       // You might want to verify token validity here
//       setUser({ token }); // Set user object with token
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('jobby_jwt', token);
//     setUser({ token });
//     navigate('/'); // Changed to navigate to home
//   };

//   const logout = () => {
//     localStorage.removeItem('jobby_jwt');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jobby_jwt');
    if (token) {
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('jobby_jwt', token);
    setUser({ token });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('jobby_jwt');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);