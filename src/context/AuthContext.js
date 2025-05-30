// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('jobby_jwt');
//     if (token) {
//       setUser({ token });
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('jobby_jwt', token);
//     setUser({ token });
//     navigate('/');
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
import { getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('jobby_jwt');
      if (token) {
        try {
          const profile = await getProfile();
          setUser({ token, profile });
        } catch (error) {
          localStorage.removeItem('jobby_jwt');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem('jobby_jwt', token);
    try {
      const profile = await getProfile();
      setUser({ token, profile });
      navigate('/');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('jobby_jwt');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);