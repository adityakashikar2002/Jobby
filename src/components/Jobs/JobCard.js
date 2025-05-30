import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <motion.div
      className="job-card"
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="job-card-header">
        <div className="company-logo">
          <img src={job.company_logo_url} alt={job.company_name} />
        </div>
        <div className="job-title-container">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company_name}</p>
        </div>
      </div>

      <div className="job-details">
        <div className="job-detail">
          <FiMapPin className="detail-icon" />
          <span>{job.location}</span>
        </div>
        <div className="job-detail">
          <FiBriefcase className="detail-icon" />
          <span>{job.employment_type}</span>
        </div>
        <div className="job-detail">
          <FiDollarSign className="detail-icon" />
          <span>
            {job.package_per_annum
              ? `${job.package_per_annum}`
              : 'Not disclosed'}
          </span>
        </div>
      </div>

      <div className="job-description">
        <h4>Description</h4>
        <p>{job.job_description}</p>
      </div>

      <div className="job-footer">
        <div className="job-posted">
          <FiClock className="detail-icon" />
          <span>Posted {job.posted}</span>
        </div>
        <Link to={`/jobs/${job.id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;