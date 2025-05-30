// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext';
// import { getJobDetails } from '../../services/api';
// import Loader from '../Common/Loader';
// import SimilarJobs from './SimilarJobs';
// import {
//   FiBriefcase,
//   FiDollarSign,
//   FiMapPin,
//   FiClock,
//   FiExternalLink,
// } from 'react-icons/fi';
// import { Divider } from '@mui/material';
// import './JobDetails.css';

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await getJobDetails(id);
//         setJob(data.job_details);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch job details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [id]);

//   if (loading) {
//     return <Loader />;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   if (!job) {
//     return <div className="no-job">Job not found</div>;
//   }

//   return (
//     <motion.div
//       className="job-details-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="job-details-card">
//         <div className="job-header">
//           <div className="company-logo">
//             <img src={job.company_logo_url} alt={job.company_name} />
//           </div>
//           <div className="job-title-container">
//             <h1>{job.title}</h1>
//             <div className="company-info">
//               <span>{job.company_name}</span>
//               <div className="company-rating">
//                 <span>⭐ {job.rating}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="job-meta">
//           <div className="job-meta-item">
//             <FiMapPin className="meta-icon" />
//             <span>{job.location}</span>
//           </div>
//           <div className="job-meta-item">
//             <FiBriefcase className="meta-icon" />
//             <span>{job.employment_type}</span>
//           </div>
//           <div className="job-meta-item">
//             <FiDollarSign className="meta-icon" />
//             <span>
//               {job.package_per_annum
//                 ? `${job.package_per_annum}`
//                 : 'Not disclosed'}
//             </span>
//           </div>
//           <div className="job-meta-item">
//             <FiClock className="meta-icon" />
//             <span>Posted {job.posted}</span>
//           </div>
//         </div>

//         <Divider sx={{ my: 3 }} />

//         <div className="job-description-section">
//           <h2>Description</h2>
//           <div
//             className="job-description"
//             dangerouslySetInnerHTML={{ __html: job.job_description }}
//           />
//         </div>

//         <div className="job-skills-section">
//           <h2>Skills</h2>
//           <div className="skills-list">
//             {job.skills.map((skill) => (
//               <motion.div
//                 key={skill.name}
//                 className="skill-item"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 <img src={skill.image_url} alt={skill.name} />
//                 <span>{skill.name}</span>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         <div className="job-life-section">
//           <h2>Life at {job.company_name}</h2>
//           <div className="life-content">
//             <div
//               className="life-description"
//               dangerouslySetInnerHTML={{ __html: job.life_at_company.description }}
//             />
//             <div className="life-image">
//               <img
//                 src={job.life_at_company.image_url}
//                 alt={`Life at ${job.company_name}`}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="apply-section">
//           <a
//             href={job.company_website_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="apply-button"
//           >
//             <span>Apply Now</span>
//             <FiExternalLink />
//           </a>
//         </div>
//       </div>

//       {job.similar_jobs && job.similar_jobs.length > 0 && (
//         <SimilarJobs jobs={job.similar_jobs} />
//       )}
//     </motion.div>
//   );
// };

// export default JobDetails;


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { getJobDetails } from '../../services/api';
import Loader from '../Common/Loader';
import SimilarJobs from './SimilarJobs';
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiClock,
  FiExternalLink,
} from 'react-icons/fi';
import { Divider } from '@mui/material';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const data = await getJobDetails(id);
        setJob(data.job_details);
        setSimilarJobs(data.similar_jobs || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!job) {
    return <div className="no-job">Job not found</div>;
  }

  return (
    <motion.div
      className="job-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="job-details-card">
        <div className="job-header">
          <div className="company-logo">
            <img src={job.company_logo_url} alt={job.company_name} />
          </div>
          <div className="job-title-container">
            <h1>{job.title}</h1>
            <div className="company-info">
              <span>{job.company_name}</span>
              <div className="company-rating">
                <span>⭐ {job.rating}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="job-meta">
          <div className="job-meta-item">
            <FiMapPin className="meta-icon" />
            <span>{job.location}</span>
          </div>
          <div className="job-meta-item">
            <FiBriefcase className="meta-icon" />
            <span>{job.employment_type}</span>
          </div>
          <div className="job-meta-item">
            <FiDollarSign className="meta-icon" />
            <span>
              {job.package_per_annum
                ? `${job.package_per_annum}`
                : 'Not disclosed'}
            </span>
          </div>
          <div className="job-meta-item">
            <FiClock className="meta-icon" />
            <span>Posted {job.posted}</span>
          </div>
        </div>

        <Divider sx={{ my: 3 }} />

        <div className="job-description-section">
          <h2>Description</h2>
          <div
            className="job-description"
            dangerouslySetInnerHTML={{ __html: job.job_description }}
          />
        </div>

        <div className="job-skills-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {job.skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="skill-item"
                whileHover={{ scale: 1.05 }}
              >
                <img src={skill.image_url} alt={skill.name} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="job-life-section">
          <h2>Life at {job.company_name}</h2>
          <div className="life-content">
            <div
              className="life-description"
              dangerouslySetInnerHTML={{ __html: job.life_at_company.description }}
            />
            <div className="life-image">
              <img
                src={job.life_at_company.image_url}
                alt={`Life at ${job.company_name}`}
              />
            </div>
          </div>
        </div>

        <div className="apply-section">
          <a
            href={job.company_website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="apply-button"
          >
            <span>Apply Now</span>
            <FiExternalLink />
          </a>
        </div>
      </div>

      {similarJobs.length > 0 && <SimilarJobs jobs={similarJobs} />}
    </motion.div>
  );
};

export default JobDetails;