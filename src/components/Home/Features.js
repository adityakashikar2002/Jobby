// import React from 'react';
// import { motion } from 'framer-motion';
// import { FiSearch, FiBriefcase, FiUser, FiBell } from 'react-icons/fi';
// import './Features.css';

// const features = [
//   {
//     icon: <FiSearch size={32} />,
//     title: 'Advanced Search',
//     description: 'Find jobs that match your skills and preferences with our powerful search engine.',
//   },
//   {
//     icon: <FiBriefcase size={32} />,
//     title: 'Diverse Opportunities',
//     description: 'Access thousands of job listings from top companies across various industries.',
//   },
//   {
//     icon: <FiUser size={32} />,
//     title: 'Personalized Profile',
//     description: 'Create a profile that showcases your skills and experience to potential employers.',
//   },
//   {
//     icon: <FiBell size={32} />,
//     title: 'Job Alerts',
//     description: 'Get notified when new jobs that match your criteria are posted.',
//   },
// ];

// const Features = () => {
//   return (
//     <section className="features-section">
//       <motion.div
//         className="features-container"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//       >
//         <motion.h2
//           initial={{ y: 20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//         >
//           Why Choose Our Platform
//         </motion.h2>
//         <motion.p
//           className="features-subtitle"
//           initial={{ y: 20, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//         >
//           We provide the best tools and resources to help you find your dream job.
//         </motion.p>

//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               className="feature-card"
//               initial={{ y: 30, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 * index, duration: 0.6 }}
//               whileHover={{ y: -5 }}
//             >
//               <div className="feature-icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// };

// export default Features;

import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiUser, FiBell } from 'react-icons/fi';
import { FaRegGem } from 'react-icons/fa';
import './Features.css';

const features = [
  {
    icon: <FiSearch size={28} />,
    title: 'Advanced Search',
    description: 'Find jobs that match your skills and preferences with our powerful search engine.',
    accentColor: '#6366f1'
  },
  {
    icon: <FiBriefcase size={28} />,
    title: 'Diverse Opportunities',
    description: 'Access thousands of job listings from top companies across various industries.',
    accentColor: '#10b981'
  },
  {
    icon: <FiUser size={28} />,
    title: 'Personalized Profile',
    description: 'Create a profile that showcases your skills and experience to potential employers.',
    accentColor: '#f59e0b'
  },
  {
    icon: <FiBell size={28} />,
    title: 'Job Alerts',
    description: 'Get notified when new jobs that match your criteria are posted.',
    accentColor: '#ec4899'
  },
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge">
            <FaRegGem className="badge-icon" />
            <span>Why Choose Us</span>
          </div>
          <h2>Designed to help you land your dream job</h2>
          <p className="features-subtitle">
            We provide the best tools and resources to help you find your perfect career match.
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -10 }}
              style={{ '--accent-color': feature.accentColor }}
            >
              <div className="feature-icon-container">
                <div className="feature-icon-bg" />
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-underline" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;