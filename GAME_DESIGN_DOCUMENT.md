# MOCK ROYALE - Game Design Document

## 1. GAME OVERVIEW

**Title:** Mock Royale
**Genre:** Battle Royale (Third-Person Top-Down)
**Platform:** Web (React)
**Target Audience:** Casual gamers, Fortnite fans

### Concept
Mock Royale is an original Fortnite-inspired battle royale game where players drop into a shrinking map, fight AI bots, gather materials, and use building mechanics to survive and achieve victory.

---

## 2. CORE GAMEPLAY MECHANICS

### 2.1 Player Movement
- **WASD / Arrow Keys:** Move in 8 directions
- **Shift:** Sprint (faster movement)
- **Smooth physics:** Momentum-based movement with friction
- **Map boundaries:** Confined to 1000x600 pixel play area

### 2.2 Combat System
- **Mouse Click:** Shoot in direction of cursor
- **Hit detection:** Simple distance-based collision
- **Damage:** 30 HP per hit to bots
- **Player health:** 100 HP starting
- **No respawn:** Elimination ends game

### 2.3 Building System
- **Press B:** Toggle build mode
- **Click:** Place wooden wall at cursor position
- **Cost:** 10 materials per wall
- **Wall stats:** 50x50 pixels, 100 HP
- **Purpose:** Block bot attacks, create cover

### 2.4 Resource System
- **Materials:** Wood (starting: 300, max: 300)
- **Regeneration:** +0.1 materials per frame (~6/sec)
- **Usage:** Building walls costs 10 materials
- **Collection:** No loot drops in prototype

### 2.5 Health & Shield
- **Health:** 100 HP (no natural regeneration)
- **Shield:** 0 SP (placeholder for future)
- **Damage source:** Storm zone outside circle
- **Storm damage:** -0.5 HP per frame outside circle

### 2.6 Storm Mechanic
- **Initial radius:** 400 pixels
- **Shrink rate:** -0.3 pixels per frame
- **Minimum radius:** 50 pixels
- **Center:** Fixed at (500, 300)
- **Visual:** Glowing purple circle boundary
- **Damage:** Continuous damage to players outside

---

## 3. AI BOT BEHAVIOR

### 3.1 Bot Types
- **3 bots spawn** at game start
- **Names:** Bot Alpha, Bot Bravo, Bot Charlie
- **Health:** 100 HP each
- **Color:** Red (vs player blue)

### 3.2 AI States
1. **Idle/Wander:** Random movement (2% chance per frame)
2. **Chase:** When player within 200px distance
3. **Attack:** Automatically when in range (handled by player)
4. **Death:** Remove from game when health ≤ 0

### 3.3 Bot Properties
- **Speed:** 1.5x player base speed when chasing
- **Detection radius:** 200 pixels
- **No shooting:** Bots don't attack back (simplified)
- **Pathfinding:** Direct line toward player

---

## 4. WIN/LOSE CONDITIONS

### Win Condition
- All 3 bots eliminated (3 eliminations)
- Player health > 0
- Displays Victory Royale screen with stats

### Lose Condition
- Player health reaches 0
- Displays defeat screen
- Shows elimination count at time of death

### Elimination Counter
- Tracks bots defeated
- Displayed in top-right UI
- Updates in real-time

---

## 5. USER INTERFACE

### 5.1 Start Screen
- **Logo:** "MOCK ROYALE" with animated gradient
- **Character preview:** Rotating 3D-like character model
- **Buttons:** PLAY, LOCKER, SETTINGS
- **Stats:** Players online, matches today, version
- **Background:** Animated particles, grid overlay

### 5.2 Lobby Screen
- **Player card:** Selected skin, tier, stats
- **Mode selector:** Solo/Duo/Squad buttons
- **Quests panel:** Daily quest progress
- **Party panel:** Shows ready players
- **Start button:** Launches match

### 5.3 Game Screen - Left (Game World)
- **Isometric-style view** of 1000x600 play area
- **Player character:** Blue with direction indicator
- **Bots:** Red characters with name tags
- **Walls:** Brown wooden structures
- **Storm circle:** Purple glowing boundary
- **Grid overlay:** Subtle background grid
- **Crosshair cursor:** Indicates aim direction

### 5.4 Game Screen - Right (HUD)
- **Top-left:** Player count, elapsed time
- **Top-right:** Elimination counter
- **Right panel:** Health/Shield/Materials bars, build mode indicator
- **Bottom-left:** Mini-map with player + storm
- **Bottom-right:** Control instructions (keyboard layout)

### 5.5 Win Screen
- **Title:** "VICTORY ROYALE!"
- **Stats cards:** Eliminations, 1st place, XP earned
- **Return button:** Goes back to lobby
- **Animations:** Title bounce, card slide-in

---

## 6. VISUAL STYLE

### 6.1 Color Palette
- **Primary:** Dark blue (#0a0e27)
- **Accent 1:** Bright blue (#3b82f6)
- **Accent 2:** Purple (#a855f7)
- **Accent 3:** Cyan (#06b6d4)
- **Highlight:** Yellow (#fbbf24)
- **Danger:** Red (#ef4444)
- **Success:** Green (#10b981)

### 6.2 Style Features
- **Rounded corners:** 8-16px border radius on UI elements
- **Gradient backgrounds:** Multi-color gradients on buttons/panels
- **Glassmorphism:** Blur backdrop effects on UI panels
- **Shadows:** Drop shadows + inset shadows for depth
- **Animations:** Smooth Framer Motion transitions
- **Cartoony:** Toy-like character models with flat shading

### 6.3 Typography
- **Font:** Segoe UI, Roboto (system fonts)
- **Sizes:** 12px (small), 16px (body), 24px (heading), 72px (title)
- **Weight:** 600 (bold UI), 700 (headings), 900 (titles)
- **Letter-spacing:** 1-3px for game feel

---

## 7. GAME FLOW

```
Start Screen
     ↓ (Click PLAY)
 Lobby Screen
     ↓ (Click START MATCH)
 Game Screen (Main Gameplay Loop)
     ↓ (Win or Lose)
 Win/Lose Screen
     ↓ (Return Home)
Start Screen (Loop)
```

### Gameplay Loop (60 FPS)
1. Process input (WASD, mouse, B key)
2. Update player position & velocity
3. Check storm damage
4. Update bot AI & positions
5. Shrink storm circle
6. Render game world
7. Render UI
8. Check win/lose conditions

---

## 8. CONTROLS

| Input | Action |
|-------|--------|
| **W / ↑** | Move forward |
| **A / ←** | Move left |
| **S / ↓** | Move backward |
| **D / →** | Move right |
| **Shift** | Sprint (faster) |
| **Mouse Move** | Aim |
| **Mouse Click** | Shoot (normal) / Build (build mode) |
| **B** | Toggle build mode |

---

## 9. TECHNICAL SPECS

### 9.1 Performance
- **Target FPS:** 60 FPS
- **Game loop:** setInterval at 1000/60 ms (~16.67ms per frame)
- **Resolution:** 1920x1080 (full viewport)
- **Aspect ratio:** 16:9 (landscape only)

### 9.2 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 9.3 Memory Usage
- **Bots:** 3 entities (minimal state)
- **Walls:** Dynamic array (built on demand)
- **Particles:** None in current build

---

## 10. FUTURE FEATURES

### Phase 2: Expanded Gameplay
- [ ] Multiplayer (real players instead of bots)
- [ ] Weapon variety (rifles, shotguns, sniper)
- [ ] Loot drops (supply crates with items)
- [ ] Multiple game modes (20v20, battle pass)
- [ ] Cosmetics system (skins, emotes)

### Phase 3: Advanced Mechanics
- [ ] Vehicles (helicopters, vehicles for traversal)
- [ ] Shield potions (healing items)
- [ ] Destructible objects (trees, buildings)
- [ ] Sound effects & music
- [ ] Mobile touch controls

### Phase 4: Social Features
- [ ] Friends list
- [ ] Leaderboards
- [ ] Replay system
- [ ] Custom lobbies
- [ ] Tournament mode

---

## 11. LEGAL & ORIGINALITY

### Original Elements
- ✅ Custom game mechanics (building simplified)
- ✅ Original UI design (not copied from Fortnite)
- ✅ Unique character models (stylized, not identical)
- ✅ Custom storm implementation
- ✅ Original color scheme & visual style

### No Copyright Infringement
- ❌ NO Fortnite assets used
- ❌ NO copied code from Fortnite
- ❌ NO trademarked names/logos
- ✅ Legally safe prototype

---

## 12. CREDITS

- **Engine:** React 18
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS
- **Design:** Original
- **Development:** 2026

---

*End of Game Design Document*
