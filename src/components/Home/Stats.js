import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import './Stats.css';

const stats = [
  { number: 10000, label: 'Jobs Posted' },
  { number: 5000, label: 'Companies' },
  { number: 250000, label: 'Candidates' },
  { number: 95, label: 'Success Rate', suffix: '%' },
];

const Stats = () => {
  return (
    <section className="stats-section">
      <motion.div
        className="stats-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
            >
              <div className="stat-number">
                <CountUp
                  end={stat.number}
                  duration={2}
                  separator=","
                  suffix={stat.suffix || ''}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;