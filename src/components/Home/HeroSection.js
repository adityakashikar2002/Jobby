import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Features from './Features';
import Stats from './Stats';
import './HeroSection.css';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <div className="hero-container">
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="hero-content"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1>
            Find Your <span>Dream Job</span> Today
          </h1>
          <p>
            Join thousands of companies and job seekers who use our platform to
            connect and grow together.
          </p>
          <motion.div
            className="hero-actions"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.location.href = '/jobs';
              }}
            >
              Browse Jobs
            </motion.button>
            {!user && (
              <motion.button
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.location.href = '/login';
                }}
              >
                Login
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="People working"
          />
        </motion.div>
      </motion.section>

      <Features />
      <Stats />
    </div>
  );
};

export default HeroSection;