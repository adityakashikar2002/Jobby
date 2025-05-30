import React from 'react';
import { motion } from 'framer-motion';
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Divider,
  Button // Import Button
} from '@mui/material';
import './Filters.css';

const employmentTypes = [
  // { id: 'FULLTIME', label: 'Full Time' },
  // { id: 'PARTTIME', label: 'Part Time' },
  { id: 'Full Time', label: 'Full Time' },
  { id: 'Part Time', label: 'Part Time' },
  { id: 'Freelance', label: 'Freelance' },
  { id: 'Internship', label: 'Internship' },
];

const salaryRanges = [
  { value: '1000000', label: '10 LPA (10-20L)' },
  { value: '2000000', label: '20 LPA (20-30L)' },
  { value: '3000000', label: '30 LPA (30-40L)' },
  { value: '4000000', label: '40 LPA (40-50L)' },
  { value: '5000000', label: '50 LPA & Above' },
];

const Filters = ({ filters, onChange, profile, clearAllFilters }) => { // Receive clearAllFilters
  const handleEmploymentTypeChange = (e) => {
    const { value, checked } = e.target;
    let newEmploymentTypes = [...filters.employmentType];

    if (checked) {
      newEmploymentTypes.push(value);
    } else {
      newEmploymentTypes = newEmploymentTypes.filter((type) => type !== value);
    }

    onChange({ ...filters, employmentType: newEmploymentTypes });
  };

  const handleSalaryChange = (e) => {
    onChange({ ...filters, minimumPackage: e.target.value });
  };

  const handleLocationChange = (e) => {
    onChange({ ...filters, location: e.target.value });
  };

  const handleSkillsChange = (e) => {
    onChange({ ...filters, skills: e.target.value });
  };

  // Check if any filter is active to enable/disable clear button
  const isFilterActive = 
    filters.employmentType.length > 0 || 
    filters.minimumPackage !== '' || 
    filters.search !== '' || 
    filters.location !== '' || 
    filters.skills !== '';

  return (
    <motion.div
      className="filters-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
        Filter By Location
      </FormLabel>
      <TextField
        label="Location"
        variant="outlined"
        fullWidth
        value={filters.location}
        onChange={handleLocationChange}
        margin="normal"
      />

      {/* <TextField
        label="Skills"
        variant="outlined"
        fullWidth
        value={filters.skills}
        onChange={handleSkillsChange}
        margin="normal"
      /> */}

      <Divider sx={{ my: 2 }} />

      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
          Type of Employment
        </FormLabel>
        <FormGroup>
          {employmentTypes.map((type) => (
            <FormControlLabel
              key={type.id}
              control={
                <Checkbox
                  checked={filters.employmentType.includes(type.id)}
                  onChange={handleEmploymentTypeChange}
                  value={type.id}
                  color="primary"
                />
              }
              label={type.label}
            />
          ))}
        </FormGroup>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
          Salary Range
        </FormLabel>
        <RadioGroup
          value={filters.minimumPackage}
          onChange={handleSalaryChange}
        >
          {salaryRanges.map((range) => (
            <FormControlLabel
              key={range.value}
              value={range.value}
              control={<Radio color="primary" />}
              label={range.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <div className="filter-actions" style={{ marginTop: '20px' }}>
        <Button 
          variant="outlined" 
          onClick={clearAllFilters}
          disabled={!isFilterActive} // Disable if no filters are active
          fullWidth
        >
          Clear Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default Filters;