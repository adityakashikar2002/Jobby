// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import { getJobs, getProfile } from '../../services/api';
// import JobCard from './JobCard';
// import Drawer from '../Common/Drawer';
// import Filters from './Filters';
// import SearchBar from './SearchBar';
// import Loader from '../Common/Loader';
// import './JobsList.css';

// const JobsList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [profile, setProfile] = useState(null);
//   const [filters, setFilters] = useState({
//     employmentType: [],
//     minimumPackage: '',
//     search: '',
//   });

//   const { authToken } = useAuth();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [profileData, jobsData] = await Promise.all([
//           getProfile(authToken),
//           getJobs(authToken),
//         ]);
//         setProfile(profileData);
//         setJobs(jobsData.jobs);
//         setFilteredJobs(jobsData.jobs);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (authToken) {
//       fetchData();
//     }
//   }, [authToken]);

//   useEffect(() => {
//     let result = [...jobs];

//     // Apply search filter
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       result = result.filter(
//         (job) =>
//           job.title.toLowerCase().includes(searchTerm) ||
//           job.company_name.toLowerCase().includes(searchTerm) ||
//           job.job_description.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Apply employment type filter
//     if (filters.employmentType.length > 0) {
//       result = result.filter((job) =>
//         filters.employmentType.includes(job.employment_type)
//       );
//     }

//     // Apply minimum package filter
//     if (filters.minimumPackage) {
//       const minPackage = parseInt(filters.minimumPackage);
//       result = result.filter(
//         (job) => job.package_per_annum >= minPackage
//       );
//     }

//     setFilteredJobs(result);
//   }, [filters, jobs]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="jobs-list-container">
//       <div className="jobs-header">
//         <motion.h1
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           Available Jobs
//         </motion.h1>
//         <motion.p
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           {filteredJobs.length} jobs found
//         </motion.p>
//       </div>

//       <div className="jobs-controls">
//         <SearchBar
//           value={filters.search}
//           onChange={(value) =>
//             handleFilterChange({ ...filters, search: value })
//           }
//         />
//         <Drawer position="right" buttonText="Filters">
//           <Filters
//             filters={filters}
//             onChange={handleFilterChange}
//             profile={profile}
//           />
//         </Drawer>
//       </div>

//       <div className="jobs-grid">
//         <AnimatePresence>
//           {filteredJobs.length > 0 ? (
//             filteredJobs.map((job) => (
//               <motion.div
//                 key={job.id}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <JobCard job={job} />
//               </motion.div>
//             ))
//           ) : (
//             <motion.div
//               className="no-jobs"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h3>No jobs found matching your criteria</h3>
//               <p>Try adjusting your filters or search term</p>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default JobsList;


// src/components/Jobs/JobsList.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getJobs, getProfile } from '../../services/api';
import JobCard from './JobCard';
import Drawer from '../Common/Drawer';
import Filters from './Filters';
import SearchBar from './SearchBar';
import Loader from '../Common/Loader';
import './JobsList.css';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profile, setProfile] = useState(null);
  const [filters, setFilters] = useState({
    employmentType: [],
    minimumPackage: '',
    search: '',
  });

  const { authToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const jobsData = await getJobs();
        setJobs(jobsData.jobs);
        setFilteredJobs(jobsData.jobs);
        
        const profileData = await getProfile();
        setProfile(profileData);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...jobs];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.company_name.toLowerCase().includes(searchTerm) ||
          job.job_description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.employmentType.length > 0) {
      result = result.filter((job) =>
        filters.employmentType.includes(job.employment_type)
      );
    }

    if (filters.minimumPackage) {
      const minPackage = parseInt(filters.minimumPackage);
      result = result.filter(
        (job) => job.package_per_annum >= minPackage
      );
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
        <Drawer position="right" buttonText="Filters">
          <Filters
            filters={filters}
            onChange={handleFilterChange}
            profile={profile}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobsList;