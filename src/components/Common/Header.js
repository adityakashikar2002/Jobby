import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { FiUser, FiLogOut } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowProfile(false);
  };

  return (
    <header className={`header ${theme}`}>
      <motion.div
        className="header-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Joboria
          </motion.span>
        </Link>

        <nav className="nav-links">
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
          </motion.ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          
          {user ? (
            <div className="profile-dropdown">
              <button 
                className="profile-button"
                onClick={() => setShowProfile(!showProfile)}
              >
                {user.profile?.profile_image_url ? (
                  <img 
                    src={user.profile.profile_image_url} 
                    alt={user.profile.name} 
                    className="profile-image"
                  />
                ) : (
                  <FiUser className="profile-icon" />
                )}
              </button>
              
              {showProfile && (
                <div className="dropdown-menu">
                  <div className="profile-info">
                    <h4>{user.profile?.name || 'User'}</h4>
                    <p>{user.profile?.short_bio || 'Welcome to Joboria'}</p>
                  </div>
                  <button 
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.button
              className="login-button"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Header;