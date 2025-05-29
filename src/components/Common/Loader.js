import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="loader-circle" />
        <div className="loader-circle" />
        <div className="loader-circle" />
      </motion.div>
    </div>
  );
};

export default Loader;