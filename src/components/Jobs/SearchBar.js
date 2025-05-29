import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import debounce from 'lodash.debounce';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce the onChange callback
  const debouncedOnChange = debounce(onChange, 500);

  useEffect(() => {
    debouncedOnChange(searchTerm);
    return () => debouncedOnChange.cancel();
  }, [searchTerm, debouncedOnChange]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <motion.div
      className="search-bar"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="search-input-container">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search jobs by title, company, or keywords"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;