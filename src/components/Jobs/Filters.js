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

// Filters component receives filters, onChange, and clearAllFilters props
const Filters = ({ filters, onChange, clearAllFilters }) => {
  // Handler for employment type checkbox changes
  const handleEmploymentTypeChange = (e) => {
    const { value, checked } = e.target;
    let newEmploymentTypes = [...filters.employmentType];

    if (checked) {
      // Add the value if the checkbox is checked
      newEmploymentTypes.push(value);
    } else {
      // Remove the value if the checkbox is unchecked
      newEmploymentTypes = newEmploymentTypes.filter((type) => type !== value);
    }

    // Update the filters state
    onChange({ ...filters, employmentType: newEmploymentTypes });
  };

  // Handler for salary range radio button changes
  const handleSalaryChange = (e) => {
    // Update the minimumPackage filter
    onChange({ ...filters, minimumPackage: e.target.value });
  };

  // Handler for location text field changes
  const handleLocationChange = (e) => {
    // Update the location filter
    onChange({ ...filters, location: e.target.value });
  };

  // Handler for skills text field changes (currently commented out in JSX)
  const handleSkillsChange = (e) => {
    // Update the skills filter
    onChange({ ...filters, skills: e.target.value });
  };

  // Determine if any filter is active to enable/disable the clear button
  const isFilterActive =
    filters.employmentType.length > 0 ||
    filters.minimumPackage !== '' ||
    filters.search !== '' ||
    filters.location !== '' ||
    filters.skills !== '';

  return (
    <motion.div
      className="filters-container" // Custom class for overall container styling
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Filter by Location section */}
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

      {/* Skills text field (commented out in original, keeping it commented) */}
      {/* <TextField
        label="Skills"
        variant="outlined"
        fullWidth
        value={filters.skills}
        onChange={handleSkillsChange}
        margin="normal"
      /> */}

      {/* Divider to separate sections */}
      <Divider sx={{ my: 2 }} className="filter-divider" /> {/* Added class for potential custom CSS */}

      {/* Type of Employment section */}
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
                  color="primary" // Uses Material-UI primary color from theme
                />
              }
              label={type.label}
            />
          ))}
        </FormGroup>
      </FormControl>

      {/* Divider to separate sections */}
      <Divider sx={{ my: 2 }} className="filter-divider" /> {/* Added class for potential custom CSS */}

      {/* Salary Range section */}
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
              control={<Radio color="primary" />} // Uses Material-UI primary color from theme
              label={range.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* Clear Filters button */}
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
