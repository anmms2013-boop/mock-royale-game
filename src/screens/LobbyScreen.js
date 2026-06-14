import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/LobbyScreen.css';

const LobbyScreen = ({ playerStats, onStartMatch, onBack }) => {
  const [selectedMode, setSelectedMode] = useState('solo');
  const [readyCount, setReadyCount] = useState(1);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="lobby-screen">
      <div className="lobby-bg" />

      <div className="lobby-container">
        {/* Header */}
        <motion.div
          className="lobby-header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Lobby</h1>
          <button className="btn-back" onClick={onBack}>← Back</button>
        </motion.div>

        {/* Main Content */}
        <div className="lobby-content">
          {/* Left - Player Display */}
          <motion.div
            className="lobby-left"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="player-card">
              <div className="player-model">
                <div className="player-avatar"></div>
              </div>
              <div className="player-info">
                <h2>Agent Alpha</h2>
                <p className="player-tier">Legendary Operator</p>
                <div className="player-stats-mini">
                  <div className="stat">Wins: <span>42</span></div>
                  <div className="stat">K/D: <span>2.5</span></div>
                </div>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mode-selector">
              <h3>Game Mode</h3>
              <div className="mode-buttons">
                {['solo', 'duo', 'squad'].map(mode => (
                  <motion.button
                    key={mode}
                    className={`mode-btn ${selectedMode === mode ? 'active' : ''}`}
                    onClick={() => setSelectedMode(mode)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {mode.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - Info & Controls */}
          <motion.div
            className="lobby-right"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Quests Panel */}
            <div className="quests-panel">
              <h3>Daily Quests</h3>
              <div className="quest-list">
                <div className="quest-item">
                  <div className="quest-title">Eliminations</div>
                  <div className="quest-progress">
                    <div className="progress-bar" style={{ width: '45%' }}></div>
                  </div>
                  <div className="quest-reward">5/10</div>
                </div>
                <div className="quest-item">
                  <div className="quest-title">Survive</div>
                  <div className="quest-progress">
                    <div className="progress-bar" style={{ width: '70%' }}></div>
                  </div>
                  <div className="quest-reward">7/10</div>
                </div>
                <div className="quest-item">
                  <div className="quest-title">Build Structures</div>
                  <div className="quest-progress">
                    <div className="progress-bar" style={{ width: '20%' }}></div>
                  </div>
                  <div className="quest-reward">2/10</div>
                </div>
              </div>
            </div>

            {/* Party Members */}
            <div className="party-panel">
              <h3>Party ({readyCount}/1)</h3>
              <div className="party-members">
                <div className="party-member ready">
                  <div className="member-avatar" />
                  <div className="member-info">
                    <p>You</p>
                    <span className="ready-badge">✓ Ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <motion.button
              className="btn btn-start-match"
              onClick={onStartMatch}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              START MATCH
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
