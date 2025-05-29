// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getProfile } from '../services/api';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authToken, setAuthToken] = useState(
//     localStorage.getItem('jobPortalToken') || null
//   );
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       if (authToken) {
//         try {
//           const profile = await getProfile(authToken);
//           setUser(profile);
//         } catch (error) {
//           logout();
//         }
//       }
//       setLoading(false);
//     };

//     initializeAuth();
//   }, [authToken]);

//   const login = (token) => {
//     localStorage.setItem('jobPortalToken', token);
//     setAuthToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem('jobPortalToken');
//     setAuthToken(null);
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, authToken, login, logout, loading }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getProfile } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(Cookies.get('jwt_token') || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (authToken) {
        try {
          const profile = await getProfile(authToken);
          setUser(profile);
        } catch (error) {
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [authToken]);

  const login = (token) => {
    // Set cookie with 1 day expiration
    Cookies.set('jwt_token', token, { expires: 1, secure: true, sameSite: 'strict' });
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove('jwt_token');
    setAuthToken(null);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, authToken, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie'; // Import js-cookie
// import { getProfile, login as apiLogin } from '../services/api'; // Rename login from api to avoid conflict

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       // Check for token in cookies
//       const token = Cookies.get('jwt_token');
//       if (token) {
//         try {
//           const profile = await getProfile();
//           setUser(profile);
//           setIsAuthenticated(true);
//         } catch (error) {
//           console.error("Error initializing auth (profile fetch failed, likely invalid token):", error);
//           Cookies.remove('jwt_token'); // Remove invalid token
//           setUser(null);
//           setIsAuthenticated(false);
//         }
//       }
//       setLoading(false);
//     };

//     initializeAuth();
//   }, []); // Empty dependency array means it runs once on mount

//   const login = async (username, password) => {
//     try {
//       const response = await apiLogin(username, password);
//       if (response.jwt_token) {
//         // Set the token in a cookie using js-cookie
//         Cookies.set('jwt_token', response.jwt_token, {
//           expires: 30, // Expires in 30 days
//           path: '/',   // Accessible across the entire site
//           // secure: true, // Use this in production if served over HTTPS
//           // sameSite: 'Lax', // Recommended for CSRF protection
//         });
//         const profile = await getProfile(); // Fetch profile after setting token
//         setUser(profile);
//         setIsAuthenticated(true);
//         navigate('/'); // Redirect to home page after successful login
//       }
//       return response;
//     } catch (error) {
//       console.error("Login failed:", error);
//       setIsAuthenticated(false);
//       throw error; // Re-throw to allow Login component to display error
//     }
//   };

//   const logout = () => {
//     Cookies.remove('jwt_token'); // Remove the token from cookies
//     setUser(null);
//     setIsAuthenticated(false);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, login, logout, loading }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
