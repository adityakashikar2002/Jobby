import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiUser, FiBell } from 'react-icons/fi';
import './Features.css';

const features = [
  {
    icon: <FiSearch size={32} />,
    title: 'Advanced Search',
    description: 'Find jobs that match your skills and preferences with our powerful search engine.',
  },
  {
    icon: <FiBriefcase size={32} />,
    title: 'Diverse Opportunities',
    description: 'Access thousands of job listings from top companies across various industries.',
  },
  {
    icon: <FiUser size={32} />,
    title: 'Personalized Profile',
    description: 'Create a profile that showcases your skills and experience to potential employers.',
  },
  {
    icon: <FiBell size={32} />,
    title: 'Job Alerts',
    description: 'Get notified when new jobs that match your criteria are posted.',
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <motion.div
        className="features-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Why Choose Our Platform
        </motion.h2>
        <motion.p
          className="features-subtitle"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          We provide the best tools and resources to help you find your dream job.
        </motion.p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Features;