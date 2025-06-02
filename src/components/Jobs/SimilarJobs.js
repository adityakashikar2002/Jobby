import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiClock,
} from 'react-icons/fi';
import './SimilarJobs.css';

const SimilarJobs = ({ jobs }) => {
  return (
    <motion.div
      className="similar-jobs-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>Similar Jobs</h2>
      <div className="similar-jobs-grid">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            className="similar-job-card"
            whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="similar-job-header">
              <div className="company-logo-card">
                <img src={job.company_logo_url} alt={job.company_name} />
              </div>
              <div className="job-title-container">
                <h3>{job.title}</h3>
                <p className="company-name">{job.company_name}</p>
              </div>
            </div>

            <div className="similar-job-description">
              <h4>Description</h4>
              <p>
                {job.job_description.length > 150
                  ? `${job.job_description.substring(0, 150)}...`
                  : job.job_description}
              </p>
            </div>

            <div className="similar-job-meta">
              <div className="job-meta-item">
                <FiMapPin className="meta-icon" />
                <span>{job.location}</span>
              </div>
              <div className="job-meta-item">
                <FiBriefcase className="meta-icon" />
                <span>{job.employment_type}</span>
              </div>
            </div>

            <div className="similar-job-footer">
              <Link to={`/jobs/${job.id}`} className="view-details-button">
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimilarJobs;