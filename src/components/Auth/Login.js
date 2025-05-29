// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { login } from '../../services/api';
// import './Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await login(username, password);
//       if (response.jwt_token) {
//         navigate('/');
//       }
//     } catch (err) {
//       setError(err.message || 'Invalid username or password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="login-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="login-card">
//         <motion.h1
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           Welcome Back
//         </motion.h1>
//         <motion.p
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Sign in to access your job portal
//         </motion.p>

//         {error && (
//           <motion.div
//             className="error-message"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <motion.div
//             className="form-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.div
//             className="form-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.button
//             type="submit"
//             className="login-button"
//             disabled={loading}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth(); // Get login from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(username, password);
      if (response.jwt_token) {
        // Use the authLogin function from context which handles cookie setting
        authLogin(response.jwt_token);
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-card">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign in to access your job portal
        </motion.p>

        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, Navigate } from 'react-router-dom'; // Import Navigate instead of Redirect
// import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import Cookies from 'js-cookie';

// import './Login.css';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login: authLogin, isAuthenticated } = useAuth();

//   // Check if token exists in cookies and if user is authenticated
//   // If both are true, it means the user is already logged in, so redirect
//   const jwtToken = Cookies.get('jwt_token');
//   if (jwtToken !== undefined && isAuthenticated) {
//     return <Navigate to="/" replace />; // Use Navigate component
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       await authLogin(username, password);
//       // Redirection is handled by AuthContext's login function now,
//       // which uses `Maps('/')`. So, if authLogin succeeds, the
//       // component will re-render, and the `Maps` component above
//       // will handle the redirection.
//     } catch (err) {
//       setError(err.message || 'Invalid username or password');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       className="login-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="login-card">
//         <motion.h1
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           transition={{ delay: 0.1 }}
//         >
//           Welcome Back
//         </motion.h1>
//         <motion.p
//           initial={{ y: -20 }}
//           animate={{ y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           Sign in to access your job portal
//         </motion.p>

//         {error && (
//           <motion.div
//             className="error-message"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <motion.div
//             className="form-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.div
//             className="form-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//           >
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </motion.div>

//           <motion.button
//             type="submit"
//             className="login-button"
//             disabled={loading}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;