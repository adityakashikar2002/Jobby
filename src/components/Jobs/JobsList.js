import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getJobs } from '../../services/api';
import JobCard from './JobCard';
import Drawer from '../Common/Drawer';
import Filters from './Filters';
import SearchBar from './SearchBar';
import Loader from '../Common/Loader';
import './JobsList.css';
import { Button } from '@mui/material';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    employmentType: [],
    minimumPackage: '',
    search: '',
    location: '',
    skills: ''
  });

  const { user } = useAuth();

  // Fetch data only once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData.jobs || []);
        setFilteredJobs(jobsData.jobs || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters whenever filters or jobs change
  useEffect(() => {
    applyFilters();
  }, [filters, jobs]);

  const applyFilters = () => {
    let result = [...jobs];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(job => {
        return (
          (job.title?.toLowerCase()?.includes(searchTerm)) ||
          (job.company_name?.toLowerCase()?.includes(searchTerm)) ||
          (job.job_description?.toLowerCase()?.includes(searchTerm)) ||
          (job.skills?.some(skill => skill.name.toLowerCase().includes(searchTerm)))
        );
      });
    }

    // Employment type filter
    if (filters.employmentType.length > 0) {
      result = result.filter(job => 
        filters.employmentType.some(type => 
          job.employment_type?.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    // Salary filter
    if (filters.minimumPackage) {
      const selectedMinPackage = parseInt(filters.minimumPackage);
      let minSalary = selectedMinPackage;
      let maxSalary = Infinity; // Default to no upper bound

      // Define ranges based on selected minimum package
      if (selectedMinPackage === 1000000) { // 10 LPA
        maxSalary = 2000000;
      } else if (selectedMinPackage === 2000000) { // 20 LPA
        maxSalary = 3000000;
      } else if (selectedMinPackage === 3000000) { // 30 LPA
        maxSalary = 4000000;
      } else if (selectedMinPackage === 4000000) { // 40 LPA
        maxSalary = 5000000;
      }
      // For 50 LPA and above, maxSalary remains Infinity

      result = result.filter(job => {
        if (!job.package_per_annum) return false;
        // Assuming package_per_annum is in Lakhs per annum (LPA)
        const jobPackage = parseFloat(job.package_per_annum) * 100000; 
        return jobPackage >= minSalary && jobPackage < maxSalary;
      });
    }

    // Location filter
    if (filters.location) {
      result = result.filter(job => 
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Skills filter
    if (filters.skills) {
      const skillsTerm = filters.skills.toLowerCase();
      result = result.filter(job =>
        job.skills?.some(skill => 
          skill.name.toLowerCase().includes(skillsTerm)
        )
      );
    }

    setFilteredJobs(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      employmentType: [],
      minimumPackage: '',
      search: '',
      location: '',
      skills: ''
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="jobs-list-container">
      <div className="jobs-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Available Jobs
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {filteredJobs.length} jobs found
        </motion.p>
      </div>

      <div className="jobs-controls">
        <SearchBar
          value={filters.search}
          onChange={(value) =>
            handleFilterChange({ ...filters, search: value })
          }
        />
        <Drawer 
          position="right" 
          buttonText="Filters"
        >
          <Filters
            filters={filters}
            onChange={handleFilterChange}
            profile={user?.profile}
            clearAllFilters={clearAllFilters} // Pass clearAllFilters to Filters component
          />
        </Drawer>
      </div>

      <div className="jobs-grid">
        <AnimatePresence>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="no-jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No jobs found matching your criteria</h3>
              <p>Try adjusting your filters or search term</p>
              <Button variant="contained" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobsList;