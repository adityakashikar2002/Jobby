// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();
//   const { user } = useAuth();

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// src/components/Common/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loader
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;