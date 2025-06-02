import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`footer ${theme}`}>
      <motion.div
        className="footer-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="footer-content">
          <motion.div
            className="footer-logo"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span>Joboria</span>
            <p>Find your dream job today</p>
          </motion.div>

          <motion.div
            className="footer-links"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/jobs">Jobs</a>
              </li>
              {/* <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li> */}
            </ul>
          </motion.div>

          <motion.div
            className="footer-contact"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3>Contact Us</h3>
            <p>Email: info@joboria.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </motion.div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} Joboria. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;