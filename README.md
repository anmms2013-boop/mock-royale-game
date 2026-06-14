# MOCK ROYALE - Installation & Setup Guide

## Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Git (optional)

## Installation Steps

### 1. Clone or Download
```bash
git clone https://github.com/anmms2013-boop/mock-royale-game.git
cd mock-royale-game
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The game will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

Output will be in the `build/` directory.

---

## Controls

### Movement
- **W / ↑** - Forward
- **A / ←** - Left
- **S / ↓** - Backward
- **D / →** - Right
- **Shift** - Sprint

### Combat
- **Mouse Move** - Aim
- **Mouse Click** - Shoot

### Building
- **B** - Toggle build mode
- **Mouse Click** - Place wall (in build mode)

---

## Game Objective

1. **Survive** the shrinking storm circle
2. **Eliminate** all 3 AI bots
3. **Build** structures for cover using materials
4. **Manage** health and materials
5. **Achieve** Victory Royale!

---

## System Requirements

- **OS:** Windows, macOS, Linux
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM:** 2GB minimum
- **Disk:** 50MB for dependencies
- **Internet:** Required for npm install

---

## Troubleshooting

### Game doesn't start
- Check Node.js installation: `node -v`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### Arrow keys scroll page
- This is fixed in the code with `preventDefault()`
- If still happening, check browser extensions

### Game is slow/laggy
- Close other tabs
- Clear browser cache
- Check GPU acceleration in browser settings

### Controls not responding
- Ensure game window is focused (click on game)
- Check if number lock affects arrow keys

---

## File Structure

```
src/
├── screens/           # Page components
│   ├── StartScreen.js
│   ├── LobbyScreen.js
│   ├── GameScreen.js
│   └── WinScreen.js
├── components/        # Game components
│   ├── GameWorld.js
│   └── GameUI.js
├── styles/            # CSS files
│   ├── *.css
├── App.js             # Root
└── index.js           # Entry point
```

---

## Future Enhancements

- [ ] Multiplayer support
- [ ] Weapon varieties
- [ ] Loot system
- [ ] Sound effects
- [ ] Mobile controls
- [ ] Custom maps
- [ ] Cosmetics shop

---

*Last Updated: 2026-06-14*
