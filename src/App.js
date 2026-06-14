import React, { useState } from 'react';
import StartScreen from './screens/StartScreen';
import LobbyScreen from './screens/LobbyScreen';
import GameScreen from './screens/GameScreen';
import WinScreen from './screens/WinScreen';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start', 'lobby', 'game', 'win'
  const [playerStats, setPlayerStats] = useState({
    selectedSkin: 'agent-alpha',
    eliminations: 0,
    health: 100,
    shield: 0,
  });

  const handlePlayClick = () => {
    setCurrentScreen('lobby');
  };

  const handleStartMatch = () => {
    setPlayerStats(prev => ({
      ...prev,
      eliminations: 0,
      health: 100,
      shield: 0,
    }));
    setCurrentScreen('game');
  };

  const handleGameEnd = (stats) => {
    setPlayerStats(prev => ({
      ...prev,
      eliminations: stats.eliminations,
    }));
    setCurrentScreen('win');
  };

  const handleReturnToStart = () => {
    setCurrentScreen('start');
  };

  return (
    <div className="app-container">
      {currentScreen === 'start' && (
        <StartScreen onPlayClick={handlePlayClick} />
      )}
      {currentScreen === 'lobby' && (
        <LobbyScreen 
          playerStats={playerStats}
          onStartMatch={handleStartMatch}
          onBack={handleReturnToStart}
        />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          playerStats={playerStats}
          onGameEnd={handleGameEnd}
        />
      )}
      {currentScreen === 'win' && (
        <WinScreen 
          stats={playerStats}
          onReturnHome={handleReturnToStart}
        />
      )}
    </div>
  );
}

export default App;
