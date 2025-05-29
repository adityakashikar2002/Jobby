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
  Slider,
  Typography,
  Divider,
} from '@mui/material';
import './Filters.css';

const employmentTypes = [
  { id: 'FULLTIME', label: 'Full Time' },
  { id: 'PARTTIME', label: 'Part Time' },
  { id: 'FREELANCE', label: 'Freelance' },
  { id: 'INTERNSHIP', label: 'Internship' },
];

const salaryRanges = [
  { value: '1000000', label: '10 LPA' },
  { value: '2000000', label: '20 LPA' },
  { value: '3000000', label: '30 LPA' },
  { value: '4000000', label: '40 LPA' },
  { value: '5000000', label: '50 LPA' },
];

const Filters = ({ filters, onChange, profile }) => {
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

  return (
    <motion.div
      className="filters-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {profile && (
        <div className="profile-section">
          <div className="profile-avatar">
            <img src={profile.profile_image_url} alt={profile.name} />
          </div>
          <div className="profile-info">
            <h3>{profile.name}</h3>
            <p>{profile.short_bio}</p>
          </div>
        </div>
      )}

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
    </motion.div>
  );
};

export default Filters;