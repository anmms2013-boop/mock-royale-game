# MOCK ROYALE - Component Structure & Architecture

## Project Structure

```
mock-royale-game/
├── public/
│   └── index.html
├── src/
│   ├── screens/
│   │   ├── StartScreen.js
│   │   ├── LobbyScreen.js
│   │   ├── GameScreen.js
│   │   └── WinScreen.js
│   ├── components/
│   │   ├── GameWorld.js
│   │   └── GameUI.js
│   ├── styles/
│   │   ├── StartScreen.css
│   │   ├── LobbyScreen.css
│   │   ├── GameScreen.css
│   │   ├── GameWorld.css
│   │   ├── GameUI.css
│   │   └── WinScreen.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── GAME_DESIGN_DOCUMENT.md
└── COMPONENT_STRUCTURE.md
```

---

## Component Hierarchy

```
<App />
├── <StartScreen />
│   └── Animated background + UI
├── <LobbyScreen />
│   ├── Player card
│   ├── Mode selector
│   ├── Quests panel
│   ├── Party panel
│   └── Start button
├── <GameScreen />
│   ├── <GameWorld />
│   │   ├── Storm circle
│   │   ├── Walls (array)
│   │   ├── Bots (array)
│   │   ├── Player character
│   │   └── Build preview
│   └── <GameUI />
│       ├── Top-left info panel
│       ├── Top-right eliminations
│       ├── Right stats panel
│       ├── Mini-map
│       └── Controls legend
└── <WinScreen />
    ├── Victory title
    ├── Stats display
    └── Return button
```

---

## SCREENS (4 Total)

### 1. StartScreen.js
**Location:** `src/screens/StartScreen.js`
**Styling:** `src/styles/StartScreen.css`

**Purpose:** Main menu entry point

**Props:**
- `onPlayClick` (function) - Navigate to lobby

**State:**
- `particleCount` (number) - Animation particle count

**Features:**
- Animated particle background
- Grid overlay
- Game title with gradient
- Character preview model (pseudo-3D)
- 3 action buttons (Play, Locker, Settings)
- Bottom stats display
- Framer Motion animations

**Key Functions:**
- `handlePlayClick()` - Triggers navigation

---

### 2. LobbyScreen.js
**Location:** `src/screens/LobbyScreen.js`
**Styling:** `src/styles/LobbyScreen.css`

**Purpose:** Pre-match preparation and party management

**Props:**
- `playerStats` (object) - Player's current stats
- `onStartMatch` (function) - Start game
- `onBack` (function) - Return to start screen

**State:**
- `selectedMode` (string) - Solo/Duo/Squad
- `readyCount` (number) - Party readiness

**Features:**
- Player character display card
- Player stats (wins, K/D ratio)
- Game mode selector (3 buttons)
- Daily quests panel (3 quests with progress)
- Party members display (1 player)
- Large START MATCH button
- Back button for navigation
- Glassmorphic UI design

**Key Functions:**
- `setSelectedMode()` - Change game mode
- `onStartMatch()` - Launch game

---

### 3. GameScreen.js
**Location:** `src/screens/GameScreen.js`
**Styling:** `src/styles/GameScreen.css`

**Purpose:** Main game loop and state management

**Props:**
- `playerStats` (object) - Starting player stats
- `onGameEnd` (function) - Handle game end

**State:**
- `player` (object) - Player position, velocity, health, materials
- `bots` (array) - AI opponents
- `walls` (array) - Built structures
- `stormCircle` (object) - Storm zone data
- `gameState` (string) - playing/won/lost
- `eliminations` (number) - Bot kills count
- `time` (number) - Elapsed seconds
- `buildMode` (boolean) - Building enabled

**Features:**
- 60 FPS game loop
- Player movement physics (WASD + mouse)
- Sprint mechanic (Shift key)
- Shooting system (mouse click)
- Building system (B key + click)
- Bot AI (wandering + chasing)
- Storm shrinking mechanics
- Collision detection
- Health/material management
- Win/lose condition checking

**Key Functions:**
- `handleKeyDown/Up()` - Input processing
- `handleMouseMove/Click()` - Aim + shoot/build
- Game loop (`useEffect` with interval) - Main update cycle
- `checkWinLose()` - Victory/defeat logic

**Physics:**
- Velocity-based movement
- Friction (0.92 multiplier per frame)
- Storm damage (-0.5 HP/frame outside circle)
- Material regeneration (+0.1/frame)

---

### 4. WinScreen.js
**Location:** `src/screens/WinScreen.js`
**Styling:** `src/styles/WinScreen.css`

**Purpose:** Match end summary and celebration

**Props:**
- `stats` (object) - Final game statistics
- `onReturnHome` (function) - Back to start screen

**State:** None (purely presentational)

**Features:**
- "VICTORY ROYALE" title (animated bounce)
- 3 stat cards (Eliminations, Place, XP)
- Return to Lobby button
- Animated card entrance
- Gradient text on title
- Framer Motion animations

**Key Functions:**
- `onReturnHome()` - Navigation

---

## COMPONENTS (2 Total)

### 1. GameWorld.js
**Location:** `src/components/GameWorld.js`
**Styling:** `src/styles/GameWorld.css`

**Purpose:** Render the game play area and entities

**Props:**
- `player` (object) - Player data {x, y, health, ...}
- `bots` (array) - Bots data [{id, x, y, health, name}, ...]
- `walls` (array) - Walls data [{id, x, y, width, height}, ...]
- `stormCircle` (object) - Storm {x, y, radius}
- `buildMode` (boolean) - Show build preview
- `mousePos` (object) - Mouse {x, y} for build preview

**Renders:**
- Storm circle (purple glowing border)
- Wall objects (brown wooden blocks)
- Bot entities (red with health bars)
- Player entity (blue with direction indicator)
- Build preview (dashed purple square)
- Grid overlay background

**Animations:**
- Smooth position updates via Framer Motion
- Bot health bar fill animation
- Storm circle glow pulse

**Key Styles:**
- `.game-world` - Main container (1000x600)
- `.storm-circle` - Animated boundary
- `.wall` - Building structure
- `.bot` / `.player` - Character rendering
- `.build-preview` - Dashed build ghost

---

### 2. GameUI.js
**Location:** `src/components/GameUI.js`
**Styling:** `src/styles/GameUI.css`

**Purpose:** Render HUD elements and information panels

**Props:**
- `player` (object) - Player stats {health, shield, materials}
- `eliminations` (number) - Kill count
- `time` (number) - Elapsed seconds
- `buildMode` (boolean) - Active build mode
- `botsRemaining` (number) - Living opponents

**Renders 5 Panels:**

1. **Top-Left Info Panel**
   - Players remaining (X/3)
   - Elapsed time (MM:SS format)

2. **Top-Right Eliminations**
   - Large elimination counter
   - Gradient pink/purple text

3. **Right Stats Panel**
   - Health bar (green gradient)
   - Shield bar (blue gradient)
   - Materials bar (orange gradient)
   - Build mode indicator (toggle state)

4. **Bottom-Left Mini-Map**
   - Player position (blue dot)
   - Storm position (purple circle)
   - 150x150 compass view

5. **Bottom-Right Controls**
   - 6 key bindings displayed
   - Keyboard legend

**Key Functions:**
- `formatTime(seconds)` - Convert to MM:SS format
- Bar width calculations from stats

**Animations:**
- Smooth bar transitions (0.2s)
- Panel slide-in on mount
- Glow effects on active build mode

---

## App.js (Root Component)
**Location:** `src/App.js`
**Styling:** `src/App.css`

**Purpose:** Screen routing and global state management

**State:**
- `currentScreen` (string) - start/lobby/game/win
- `playerStats` (object) - {selectedSkin, eliminations, health, shield}

**Handles:**
- Screen navigation
- Player stats persistence
- Event delegation

**State Transitions:**
```
start --[Play]--> lobby --[Start Match]--> game --[Win/Lose]--> win --[Home]--> start
```

---

## STYLING FILES (6 Total)

| File | Component | Lines | Purpose |
|------|-----------|-------|----------|
| StartScreen.css | StartScreen | ~200 | Menu animations, particles |
| LobbyScreen.css | LobbyScreen | ~250 | Cards, panels, mode selector |
| GameScreen.css | GameScreen | ~20 | Container layout |
| GameWorld.css | GameWorld | ~150 | Game entities, storm, grid |
| GameUI.css | GameUI | ~250 | HUD panels, bars, mini-map |
| WinScreen.css | WinScreen | ~150 | Victory layout, animations |

---

## Global Styles

**index.css:**
- CSS reset
- Tailwind imports
- Global animations (@keyframes)
- Custom game fonts
- Scrollbar styling
- Overflow prevention

**tailwind.config.js:**
- Custom color palette
- Extended theme colors
- Game-specific animations

---

## Data Flow Diagram

```
App (Screen Router)
    ↓
  State Management
    ↓
  ├─→ StartScreen (Navigation)
    ├─→ LobbyScreen (UI only)
        ↓
        └─→ GameScreen (Main Loop)
            ├─→ Input Handling (WASD, Mouse, B)
            ├─→ Physics Update (Player, Bots, Storm)
            ├─→ Collision Detection
            ├─→ State Update
            └─→ Render:
                ├─→ GameWorld (Entities)
                └─→ GameUI (HUD)
            ↓
        Win/Lose Check
            ↓
        WinScreen (Summary)
```

---

## Key Technologies

| Library | Version | Purpose |
|---------|---------|----------|
| React | 18.2.0 | UI framework |
| Framer Motion | 10.16.4 | Animations |
| Tailwind CSS | 3.3.0 | Utility styling |
| PostCSS | 8.4.24 | CSS processing |
| Autoprefixer | 10.4.14 | Cross-browser support |

---

## Performance Considerations

### Optimization Tips
1. **Memoization:** Use `React.memo()` for GameWorld/GameUI if re-renders increase
2. **State batching:** Group state updates in useEffect
3. **Animation throttling:** Framer Motion uses GPU acceleration
4. **Canvas alternative:** Consider Canvas API for 1000+ entities
5. **Web Workers:** Offload physics to worker thread (future)

### Current Performance
- **Target:** 60 FPS
- **Bots:** 3 entities (minimal overhead)
- **Walls:** Dynamic (typically 5-20 objects)
- **Particles:** None (kept simple)
- **Browser support:** All modern browsers

---

## Future Component Additions

### Phase 2 Components
- `WeaponSelector.js` - Multiple weapon types
- `InventorySystem.js` - Item management
- `LootDrop.js` - Supply crate spawning
- `ParticleEffect.js` - Visual effects
- `SoundManager.js` - Audio engine

### Phase 3 Components
- `Multiplayer.js` - Player synchronization
- `VehicleController.js` - Driveable objects
- `Leaderboard.js` - Ranking display
- `SettingsPanel.js` - Audio/graphics options
- `ReplayPlayer.js` - Match replay

---

*End of Component Structure Document*
