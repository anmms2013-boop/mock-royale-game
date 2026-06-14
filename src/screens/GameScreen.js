import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import GameWorld from '../components/GameWorld';
import GameUI from '../components/GameUI';
import '../styles/GameScreen.css';

const GameScreen = ({ playerStats, onGameEnd }) => {
  const [player, setPlayer] = useState({
    x: 400,
    y: 300,
    vx: 0,
    vy: 0,
    health: 100,
    shield: 0,
    materials: 300,
  });

  const [bots, setBots] = useState([
    { id: 1, x: 200, y: 150, vx: 0, vy: 0, health: 100, name: 'Bot Alpha', targetX: null, targetY: null },
    { id: 2, x: 600, y: 400, vx: 0, vy: 0, health: 100, name: 'Bot Bravo', targetX: null, targetY: null },
    { id: 3, x: 800, y: 200, vx: 0, vy: 0, health: 100, name: 'Bot Charlie', targetX: null, targetY: null },
  ]);

  const [walls, setWalls] = useState([]);
  const [stormCircle, setStormCircle] = useState({
    x: 500,
    y: 300,
    radius: 400,
    minRadius: 50,
  });
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [eliminations, setEliminations] = useState(0);
  const [time, setTime] = useState(0);
  const [buildMode, setBuildMode] = useState(false);

  const keysPressed = useRef({});
  const mousePos = useRef({ x: 0, y: 0 });
  const gameRunning = useRef(true);

  // Handle key input
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Prevent default for arrow keys and space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      keysPressed.current[e.key.toLowerCase()] = true;

      if (e.key.toLowerCase() === 'b') {
        setBuildMode(prev => !prev);
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseClick = (e) => {
      if (!buildMode) {
        // Shoot
        const dx = mousePos.current.x - player.x;
        const dy = mousePos.current.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          const bulletVx = (dx / dist) * 8;
          const bulletVy = (dy / dist) * 8;

          // Simple hit detection
          bots.forEach(bot => {
            const botDist = Math.sqrt(
              (bot.x - player.x) ** 2 + (bot.y - player.y) ** 2
            );
            if (botDist < 150) {
              setBots(prev =>
                prev.map(b =>
                  b.id === bot.id ? { ...b, health: Math.max(0, b.health - 30) } : b
                )
              );
            }
          });
        }
      } else {
        // Place wall
        if (player.materials >= 10) {
          setWalls(prev => [
            ...prev,
            {
              id: Date.now(),
              x: player.x + 50,
              y: player.y,
              width: 50,
              height: 50,
              health: 100,
            },
          ]);
          setPlayer(prev => ({ ...prev, materials: prev.materials - 10 }));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [player, bots, buildMode]);

  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      setPlayer(prevPlayer => {
        let newPlayer = { ...prevPlayer };

        // Movement
        const speed = keysPressed.current['shift'] ? 4 : 2.5;
        if (keysPressed.current['w'] || keysPressed.current['arrowup']) newPlayer.vy -= speed;
        if (keysPressed.current['s'] || keysPressed.current['arrowdown']) newPlayer.vy += speed;
        if (keysPressed.current['a'] || keysPressed.current['arrowleft']) newPlayer.vx -= speed;
        if (keysPressed.current['d'] || keysPressed.current['arrowright']) newPlayer.vx += speed;

        // Friction
        newPlayer.vx *= 0.92;
        newPlayer.vy *= 0.92;

        // Position update
        newPlayer.x += newPlayer.vx;
        newPlayer.y += newPlayer.vy;

        // Boundary check
        newPlayer.x = Math.max(0, Math.min(1000, newPlayer.x));
        newPlayer.y = Math.max(0, Math.min(600, newPlayer.y));

        // Storm damage
        const distToCenter = Math.sqrt(
          (newPlayer.x - stormCircle.x) ** 2 + (newPlayer.y - stormCircle.y) ** 2
        );
        if (distToCenter > stormCircle.radius) {
          newPlayer.health = Math.max(0, newPlayer.health - 0.5);
        }

        // Regenerate materials slowly
        newPlayer.materials = Math.min(300, newPlayer.materials + 0.1);

        return newPlayer;
      });

      // Bot AI
      setBots(prevBots =>
        prevBots
          .map(bot => {
            if (bot.health <= 0) return bot;

            let newBot = { ...bot };
            const distToPlayer = Math.sqrt(
              (bot.x - player.x) ** 2 + (bot.y - player.y) ** 2
            );

            // Chase player if close
            if (distToPlayer < 200) {
              const dx = player.x - bot.x;
              const dy = player.y - bot.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              newBot.vx = (dx / dist) * 1.5;
              newBot.vy = (dy / dist) * 1.5;
              newBot.targetX = player.x;
              newBot.targetY = player.y;
            } else {
              // Random wandering
              if (Math.random() < 0.02) {
                newBot.vx = (Math.random() - 0.5) * 2;
                newBot.vy = (Math.random() - 0.5) * 2;
              }
            }

            newBot.x += newBot.vx;
            newBot.y += newBot.vy;
            newBot.x = Math.max(0, Math.min(1000, newBot.x));
            newBot.y = Math.max(0, Math.min(600, newBot.y));

            return newBot;
          })
          .filter(bot => bot.health > 0)
      );

      // Shrink storm
      setStormCircle(prev => ({
        ...prev,
        radius: Math.max(prev.minRadius, prev.radius - 0.3),
      }));

      // Update time
      setTime(t => t + 1);
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [player, stormCircle]);

  // Check win/lose conditions
  useEffect(() => {
    if (player.health <= 0) {
      setGameState('lost');
      onGameEnd({ eliminations });
    }

    if (bots.length === 0 && eliminations > 0) {
      setGameState('won');
      onGameEnd({ eliminations });
    }
  }, [player.health, bots, eliminations, onGameEnd]);

  // Track eliminations
  useEffect(() => {
    setEliminations(3 - bots.length);
  }, [bots]);

  return (
    <div className="game-screen">
      <GameWorld
        player={player}
        bots={bots}
        walls={walls}
        stormCircle={stormCircle}
        buildMode={buildMode}
        mousePos={mousePos.current}
      />
      <GameUI
        player={player}
        eliminations={eliminations}
        time={time}
        buildMode={buildMode}
        botsRemaining={bots.length}
      />
    </div>
  );
};

export default GameScreen;
