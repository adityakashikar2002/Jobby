// // // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // import { useNavigate } from 'react-router-dom';
// // // import { getProfile } from '../services/api';

// // // const AuthContext = createContext();

// // // export const AuthProvider = ({ children }) => {
// // //   const [user, setUser] = useState(null);
// // //   const [authToken, setAuthToken] = useState(
// // //     localStorage.getItem('jobPortalToken') || null
// // //   );
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const initializeAuth = async () => {
// // //       if (authToken) {
// // //         try {
// // //           const profile = await getProfile(authToken);
// // //           setUser(profile);
// // //         } catch (error) {
// // //           logout();
// // //         }
// // //       }
// // //       setLoading(false);
// // //     };

// // //     initializeAuth();
// // //   }, [authToken]);

// // //   const login = (token) => {
// // //     localStorage.setItem('jobPortalToken', token);
// // //     setAuthToken(token);
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem('jobPortalToken');
// // //     setAuthToken(null);
// // //     setUser(null);
// // //     navigate('/login');
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ user, authToken, login, logout, loading }}
// // //     >
// // //       {!loading && children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => useContext(AuthContext);


// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getProfile } from '../services/api';
// // import Cookies from 'js-cookie';

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const initializeAuth = async () => {
// //       const token = Cookies.get('jwt_token');
// //       if (token) {
// //         try {
// //           const profile = await getProfile();
// //           setUser(profile);
// //         } catch (error) {
// //           logout();
// //         }
// //       }
// //       setLoading(false);
// //     };

// //     initializeAuth();
// //   }, []);

// //   const login = (token) => {
// //     Cookies.set('jwt_token', token, {
// //       expires: 30,
// //       path: '/',
// //     });
// //   };

// //   const logout = () => {
// //     Cookies.remove('jwt_token');
// //     setUser(null);
// //     navigate('/login');
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, login, logout, loading }}
// //     >
// //       {!loading && children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authToken, setAuthToken] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('jobby_jwt');
//     if (token) {
//       setAuthToken(token);
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('jobby_jwt', token);
//     setAuthToken(token);
//     navigate('/jobs');
//   };

//   const logout = () => {
//     localStorage.removeItem('jobby_jwt');
//     setAuthToken(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ authToken, login, logout, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Added user state
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jobby_jwt');
    if (token) {
      // You might want to verify token validity here
      setUser({ token }); // Set user object with token
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('jobby_jwt', token);
    setUser({ token });
    navigate('/'); // Changed to navigate to home
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