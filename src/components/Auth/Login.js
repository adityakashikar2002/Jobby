// import { useState } from 'react'
// import { useAuth } from '../../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import './Login.css' // Import the CSS file

// const Login = () => {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError('')

//     try {
//       const userDetails = { username, password }
//       const url = 'https://apis.ccbp.in/login'
//       const options = {
//         method: 'POST',
//         body: JSON.stringify(userDetails),
//       }

//       const response = await fetch(url, options)
//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.error_msg || 'Invalid username or password')
//       }

//       login(data.jwt_token)
//       navigate('/')
//     } catch (err) {
//       setError(err.message || 'Failed to login. Please try again.')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="login-container"> {/* Applied login-container class */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="login-card" // Applied login-card class
//       >
//         <div className="p-8">
//           <div className="text-center mb-8">
//             <h1>Welcome to Jobby</h1> {/* Styles from login-card h1 */}
//             <p>Find the job that fits your life</p> {/* Styles from login-card p */}
//           </div>

//           {error && (
//             <div className="error-message"> {/* Applied error-message class */}
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="form-group"> {/* Applied form-group class */}
//               <label htmlFor="username">Username</label> {/* Styles from form-group label */}
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               /> {/* Styles from form-group input */}
//             </div>
//             <div className="form-group"> {/* Applied form-group class */}
//               <label htmlFor="password">Password</label> {/* Styles from form-group label */}
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               /> {/* Styles from form-group input */}
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="login-button" // Applied login-button class
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Logging in...
//                 </>
//               ) : (
//                 'Login'
//               )}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// export default Login;


// src/components/Auth/Login.js
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const userDetails = { username, password };
      const url = 'https://apis.ccbp.in/login';
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error_msg || 'Invalid username or password');
      }

      login(data.jwt_token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="login-card"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h1>Welcome to JobPortal</h1>
            <p>Find the job that fits your life</p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;