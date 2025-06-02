import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaBriefcase, FaUserTie, FaUsers, FaChartLine } from 'react-icons/fa';
import './Stats.css';

const stats = [
  { 
    number: 10000, 
    label: 'Jobs Posted',
    icon: <FaBriefcase size={24} />,
    suffix: '+'
  },
  { 
    number: 5000, 
    label: 'Companies',
    icon: <FaUserTie size={24} />,
    suffix: '+'
  },
  { 
    number: 250000, 
    label: 'Candidates',
    icon: <FaUsers size={24} />,
    suffix: '+'
  },
  { 
    number: 95, 
    label: 'Success Rate',
    icon: <FaChartLine size={24} />,
    suffix: '%'
  },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-number">
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;