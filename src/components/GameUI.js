import React from 'react';
import { motion } from 'framer-motion';
import '../styles/GameUI.css';

const GameUI = ({ player, eliminations, time, buildMode, botsRemaining }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-ui">
      {/* Top Left - Game Info */}
      <motion.div
        className="ui-panel top-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="info-item">
          <span className="label">Players</span>
          <span className="value">{botsRemaining + 1}/3</span>
        </div>
        <div className="info-item">
          <span className="label">Time</span>
          <span className="value">{formatTime(time)}</span>
        </div>
      </motion.div>

      {/* Top Right - Eliminations */}
      <motion.div
        className="ui-panel top-right"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="eliminations">
          <h3>Eliminations</h3>
          <p className="big-number">{eliminations}</p>
        </div>
      </motion.div>

      {/* Right Panel - Stats */}
      <motion.div
        className="ui-panel right-panel"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Health */}
        <div className="stat-group">
          <div className="stat-label">Health</div>
          <div className="health-bar">
            <div
              className="health-fill"
              style={{ width: `${(player.health / 100) * 100}%` }}
            />
          </div>
          <div className="stat-value">{Math.round(player.health)}/100</div>
        </div>

        {/* Shield */}
        <div className="stat-group">
          <div className="stat-label">Shield</div>
          <div className="shield-bar">
            <div
              className="shield-fill"
              style={{ width: `${(player.shield / 100) * 100}%` }}
            />
          </div>
          <div className="stat-value">{Math.round(player.shield)}/100</div>
        </div>

        {/* Materials */}
        <div className="stat-group">
          <div className="stat-label">Wood</div>
          <div className="materials-bar">
            <div
              className="materials-fill"
              style={{ width: `${(player.materials / 300) * 100}%` }}
            />
          </div>
          <div className="stat-value">{Math.round(player.materials)}/300</div>
        </div>

        {/* Build Mode Indicator */}
        <div className={`build-mode-indicator ${buildMode ? 'active' : ''}`}>
          {buildMode ? '🔨 BUILD MODE' : 'Press B for Build'}
        </div>
      </motion.div>

      {/* Bottom Left - Mini Map */}
      <motion.div
        className="ui-panel mini-map"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="map-container">
          <div className="map-bg" />
          <div
            className="map-player"
            style={{
              left: `${(player.x / 1000) * 100}%`,
              top: `${(player.y / 600) * 100}%`,
            }}
          />
          <div
            className="map-storm"
            style={{
              left: `${((stormCircle?.x || 500) / 1000) * 100}%`,
              top: `${((stormCircle?.y || 300) / 600) * 100}%`,
              width: `${((stormCircle?.radius || 100) * 2 / 1000) * 100}%`,
              height: `${((stormCircle?.radius || 100) * 2 / 600) * 100}%`,
            }}
          />
        </div>
      </motion.div>

      {/* Bottom Right - Controls */}
      <motion.div
        className="ui-panel controls"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="control-item">
          <kbd>W/↑</kbd>
          <span>Move Forward</span>
        </div>
        <div className="control-item">
          <kbd>A/←</kbd>
          <span>Move Left</span>
        </div>
        <div className="control-item">
          <kbd>D/→</kbd>
          <span>Move Right</span>
        </div>
        <div className="control-item">
          <kbd>S/↓</kbd>
          <span>Move Back</span>
        </div>
        <div className="control-item">
          <kbd>Click</kbd>
          <span>Shoot / Build</span>
        </div>
        <div className="control-item">
          <kbd>B</kbd>
          <span>Toggle Build</span>
        </div>
      </motion.div>
    </div>
  );
};

export default GameUI;
