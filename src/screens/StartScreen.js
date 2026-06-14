import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/StartScreen.css';

const StartScreen = ({ onPlayClick }) => {
  const [particleCount, setParticleCount] = useState(30);

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="start-screen">
      {/* Animated Background */}
      <div className="bg-gradient-to-br from-game-dark via-blue-900 to-purple-900 absolute inset-0">
        {/* Particle effect */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -300],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Grid background */}
        <div className="grid-background" />
      </div>

      {/* Content */}
      <div className="start-content">
        {/* Left side - Logo & Buttons */}
        <motion.div
          className="left-section"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="game-title"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="title-text">MOCK</span>
            <span className="title-accent">ROYALE</span>
          </motion.h1>

          <p className="game-subtitle">
            Drop. Fight. Build. Survive.
          </p>

          <div className="button-group">
            <motion.button
              className="btn btn-primary"
              onClick={onPlayClick}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              PLAY
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LOCKER
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SETTINGS
            </motion.button>
          </div>
        </motion.div>

        {/* Right side - Character Preview */}
        <motion.div
          className="right-section"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="character-display">
            <motion.div
              className="character-model"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              {/* Pseudo-3D character */}
              <div className="character-head"></div>
              <div className="character-body"></div>
              <div className="character-legs"></div>
            </motion.div>

            <div className="character-info">
              <h3>Agent Alpha</h3>
              <p>Legendary Operator</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom stats */}
      <motion.div
        className="bottom-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="stat-item">
          <span className="stat-label">Players Online:</span>
          <span className="stat-value">1,234</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Matches Today:</span>
          <span className="stat-value">5,678</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Version:</span>
          <span className="stat-value">1.0.0</span>
        </div>
      </motion.div>
    </div>
  );
};

export default StartScreen;
