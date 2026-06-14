import React from 'react';
import { motion } from 'framer-motion';
import '../styles/WinScreen.css';

const WinScreen = ({ stats, onReturnHome }) => {
  return (
    <div className="win-screen">
      <div className="win-bg" />

      <motion.div
        className="win-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="win-title"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          VICTORY ROYALE!
        </motion.h1>

        <div className="stats-display">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>Eliminations</h3>
            <p className="big-stat">{stats.eliminations}</p>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3>Survivors</h3>
            <p className="big-stat">1st Place</p>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3>XP Earned</h3>
            <p className="big-stat">+250</p>
          </motion.div>
        </div>

        <motion.button
          className="btn btn-primary"
          onClick={onReturnHome}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Return to Lobby
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WinScreen;
