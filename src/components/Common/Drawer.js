import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiFilter } from 'react-icons/fi';
import './Drawer.css';

const Drawer = ({ children, position = 'right', buttonText = 'Filters' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const drawerVariants = {
    right: {
      hidden: { x: '100%' },
      visible: { x: 0 },
    },
    left: {
      hidden: { x: '-100%' },
      visible: { x: 0 },
    },
    bottom: {
      hidden: { y: '100%' },
      visible: { y: 0 },
    },
    top: {
      hidden: { y: '-100%' },
      visible: { y: 0 },
    },
  };

  return (
    <>
      <motion.button
        className="drawer-toggle-button"
        onClick={toggleDrawer}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiFilter />
        <span>{buttonText}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
            />
            <motion.div
              className={`drawer drawer-${position}`}
              variants={drawerVariants[position]}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="drawer-header">
                <h3>{buttonText}</h3>
                <button className="drawer-close" onClick={toggleDrawer}>
                  <FiX size={24} />
                </button>
              </div>
              <div className="drawer-content">{children}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Drawer;