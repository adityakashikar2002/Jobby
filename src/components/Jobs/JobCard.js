import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiDollarSign, FiMapPin, FiClock, FiBookmark } from 'react-icons/fi';
import './JobCard.css';

const JobCard = ({ job }) => {
  return (
    <motion.div
      className="job-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="job-card-header">
        <div className="company-logo-card">
          <img src={job.company_logo_url} alt={job.company_name} />
        </div>
        <div className="job-title-container">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company_name}</p>
          <div className="job-rating">
            <span>⭐ {job.rating || '4.5'}</span>
          </div>
        </div>
        <button className="save-button">
          <FiBookmark />
        </button>
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
        <p>{job.job_description}</p>
      </div>

      <div className="job-skills">
        {job.skills?.slice(0, 3).map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill.name}
          </span>
        ))}
        {job.skills?.length > 3 && (
          <span className="skill-tag more">+{job.skills.length - 3} more</span>
        )}
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


// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiBriefcase, FiDollarSign, FiMapPin, FiClock, FiBookmark } from 'react-icons/fi';
// import './JobCard.css';

// const JobCard = ({ job }) => {
//   // Generate a random accent color class for variety
//   const accentColors = ['accent-blue', 'accent-green', 'accent-purple', 'accent-orange'];
//   const randomAccent = accentColors[Math.floor(Math.random() * accentColors.length)];

//   return (
//     <motion.div
//       className={`job-card ${randomAccent}`}
//       whileHover={{ 
//         y: -8,
//         boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
//       }}
//       transition={{ 
//         duration: 0.3,
//         ease: [0.25, 0.1, 0.25, 1]
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//     >
//       <div className="job-card-header">
//         <div className="company-logo-card">
//           <img src={job.company_logo_url} alt={job.company_name} />
//         </div>
//         <div className="job-title-container">
//           <h3 className="job-title">{job.title}</h3>
//           <p className="company-name">{job.company_name}</p>
//           <div className="job-meta">
//             <span className="job-rating">⭐ {job.rating || '4.5'}</span>
//             <span className="job-type">{job.employment_type}</span>
//           </div>
//         </div>
//         <button className="save-button">
//           <FiBookmark className="bookmark-icon" />
//         </button>
//       </div>

//       <div className="job-details">
//         <div className="job-detail">
//           <FiMapPin className="detail-icon" />
//           <span>{job.location}</span>
//         </div>
//         <div className="job-detail">
//           <FiDollarSign className="detail-icon" />
//           <span>
//             {job.package_per_annum
//               ? `${job.package_per_annum}`
//               : 'Not disclosed'}
//           </span>
//         </div>
//       </div>

//       <div className="job-description">
//         <p>{job.job_description}</p>
//       </div>

//       <div className="job-skills">
//         {job.skills?.slice(0, 4).map((skill, index) => (
//           <span key={index} className="skill-tag">
//             {skill.name}
//           </span>
//         ))}
//         {job.skills?.length > 4 && (
//           <span className="skill-tag more">+{job.skills.length - 4}</span>
//         )}
//       </div>

//       <div className="job-footer">
//         <div className="job-posted">
//           <FiClock className="detail-icon" />
//           <span>Posted {job.posted}</span>
//         </div>
//         <Link to={`/jobs/${job.id}`} className="view-details-button">
//           View Details
//           <span className="button-arrow">→</span>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// export default JobCard;