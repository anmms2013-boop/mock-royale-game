import React from 'react';
import { motion } from 'framer-motion';
import '../styles/GameWorld.css';

const GameWorld = ({ player, bots, walls, stormCircle, buildMode, mousePos }) => {
  return (
    <div className="game-world">
      {/* Storm circle */}
      <div
        className="storm-circle"
        style={{
          left: `${stormCircle.x}px`,
          top: `${stormCircle.y}px`,
          width: `${stormCircle.radius * 2}px`,
          height: `${stormCircle.radius * 2}px`,
        }}
      />

      {/* Walls */}
      {walls.map(wall => (
        <div
          key={wall.id}
          className="wall"
          style={{
            left: `${wall.x}px`,
            top: `${wall.y}px`,
            width: `${wall.width}px`,
            height: `${wall.height}px`,
          }}
        />
      ))}

      {/* Bots */}
      {bots.map(bot => (
        <motion.div
          key={bot.id}
          className="bot"
          animate={{
            x: bot.x,
            y: bot.y,
          }}
          transition={{ type: 'linear', duration: 0.016 }}
          style={{
            left: 0,
            top: 0,
          }}
        >
          <div className="bot-body" />
          <div className="bot-name">{bot.name}</div>
          <div className="bot-health-bar">
            <div
              className="bot-health-fill"
              style={{ width: `${(bot.health / 100) * 100}%` }}
            />
          </div>
        </motion.div>
      ))}

      {/* Player */}
      <motion.div
        className="player"
        animate={{
          x: player.x,
          y: player.y,
        }}
        transition={{ type: 'linear', duration: 0.016 }}
        style={{
          left: 0,
          top: 0,
        }}
      >
        <div className="player-body" />
        <div className="player-direction" style={{
          transform: `rotate(${Math.atan2(mousePos.y - player.y, mousePos.x - player.x) * 180 / Math.PI}deg)`
        }} />
      </motion.div>

      {/* Build preview */}
      {buildMode && (
        <div
          className="build-preview"
          style={{
            left: `${player.x + 50}px`,
            top: `${player.y}px`,
          }}
        />
      )}

      {/* Grid overlay */}
      <div className="game-grid" />
    </div>
  );
};

export default GameWorld;
