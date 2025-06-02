import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Features from './Features';
import Stats from './Stats';
import './HeroSection.css';

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <div className="hero-background" />
      
      <section className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">
              <span>New</span> The #1 job platform for professionals
            </div>
            <h1>
              Find Your <span>Dream Job</span> Without the Hassle
            </h1>
            <p className="hero-subtitle">
              Join thousands of companies and job seekers who use our platform to
              connect and grow together. Get matched with opportunities that fit your skills.
            </p>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.button
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jobs')}
            >
              Browse Jobs <FiArrowRight className="button-icon" />
            </motion.button>
            {!user && (
              <motion.button
                className="secondary-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
              >
                Create Account
              </motion.button>
            )}
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Jobs Posted</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Companies</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="hero-image">
            <img
              // src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              src="/woman.jpg"
              alt="People working"
            />
          </div>
          <div className="hero-image-decoration" />
        </motion.div>
      </section>
      <Features />
      {/* <Stats /> */}
    </div>
  );
};

export default HeroSection;