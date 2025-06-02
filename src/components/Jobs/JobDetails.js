import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiStar,
  FiChevronRight
} from 'react-icons/fi';
import { Divider, Chip, Button } from '@mui/material';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedSection, setExpandedSection] = useState('description');

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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <motion.div
        className="error-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error}
      </motion.div>
    );
  }

  if (!job) {
    return (
      <motion.div
        className="no-job"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Job not found
      </motion.div>
    );
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
          <div className="company-logo-container">
            <motion.div 
              className="company-logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src={job.company_logo_url} alt={job.company_name} />
            </motion.div>
            <div className="company-badge">
              <FiStar className="star-icon" />
              <span>Featured</span>
            </div>
          </div>
          
          <div className="job-title-container">
            <div className="job-title-wrapper">
              <h1>{job.title}</h1>
              {/* <div className="job-actions">
                <Button variant="outlined" className="save-btn">
                  Save
                </Button>
                <Button variant="outlined" className="share-btn">
                  Share
                </Button>
              </div> */}
            </div>
            
            <div className="company-info">
              <div className="company-name-rating">
                <span className="company-name">{job.company_name}</span>
                <div className="company-rating">
                  <FiStar className="rating-icon" />
                  <span>{job.rating}</span>
                </div>
              </div>
              <div className="job-posted">
                <FiClock className="clock-icon" />
                <span>Posted {job.posted}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="job-meta-container">
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
          </div>
          
          <div className="job-apply-mobile">
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

        <Divider className="custom-divider" />

        <nav className="job-details-nav">
          <button
            className={`nav-item ${expandedSection === 'description' ? 'active' : ''}`}
            onClick={() => toggleSection('description')}
          >
            Description
          </button>
          <button
            className={`nav-item ${expandedSection === 'skills' ? 'active' : ''}`}
            onClick={() => toggleSection('skills')}
          >
            Skills
          </button>
          <button
            className={`nav-item ${expandedSection === 'life' ? 'active' : ''}`}
            onClick={() => toggleSection('life')}
          >
            Company Life
          </button>
        </nav>

        <AnimatePresence mode="wait">
          {expandedSection === 'description' && (
            <motion.div
              className="job-description-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="section-title">
                <FiChevronRight className="section-icon" />
                Job Description
              </h2>
              <div
                className="job-description"
                dangerouslySetInnerHTML={{ __html: job.job_description }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {expandedSection === 'skills' && (
            <motion.div
              className="job-skills-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="section-title">
                <FiChevronRight className="section-icon" />
                Required Skills
              </h2>
              <div className="skills-list">
                {job.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="skill-image">
                      <img src={skill.image_url} alt={skill.name} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {expandedSection === 'life' && (
            <motion.div
              className="job-life-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="section-title">
                <FiChevronRight className="section-icon" />
                Life at {job.company_name}
              </h2>
              <div className="life-content">
                <div
                  className="life-description"
                  dangerouslySetInnerHTML={{ __html: job.life_at_company.description }}
                />
                <div className="life-image-container">
                  <img
                    src={job.life_at_company.image_url}
                    alt={`Life at ${job.company_name}`}
                    className="life-image"
                  />
                  <div className="image-caption">Work environment at {job.company_name}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="apply-section">
          <div className="apply-content">
            <div className="apply-info">
              <h3>Ready to apply?</h3>
              <p>This application will take you to the company's career page</p>
            </div>
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
      </div>

      {similarJobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SimilarJobs jobs={similarJobs} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobDetails;