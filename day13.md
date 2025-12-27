---
layout: default
title: Week 13 - Final Project Detailed Documentation
nav_order: 13
---

# Deep Space Run - Technical Documentation

> A retro-futuristic 3D space racing visualization built with p5.js and WebGL

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Dependencies & Setup](#dependencies--setup)
3. [Global Variables](#global-variables)
4. [Core Functions](#core-functions)
   - [preload()](#preload)
   - [setup()](#setup)
   - [draw()](#draw)
5. [Player System](#player-system)
   - [drawPlayer()](#drawplayer)
6. [Environment Systems](#environment-systems)
   - [drawRetroMoon()](#drawretromoon)
   - [drawSaturn()](#drawsaturn)
   - [drawMovingTerrain()](#drawmovingterrain)
   - [getTerrainHeight()](#getterrainheight)
7. [Particle Systems](#particle-systems)
   - [drawHyperSpeed()](#drawhyperspeed)
   - [Star Class](#star-class)
8. [Technical Specifications](#technical-specifications)
9. [Visual Style Guide](#visual-style-guide)

---

## Project Overview

**Deep Space Run** is a 3D visual experience that simulates flying through deep space with a wireframe aesthetic. The project features:

- **Square Grid Terrain**: Procedurally generated terrain with Perlin noise
- **Wireframe Celestial Bodies**: Retro-style moon and Saturn with rings
- **Hyperspace Effect**: Streaking stars creating a sense of speed
- **Fixed Center Player Model**: A 3D `.obj` model rendered as a wireframe vehicle

### Design Philosophy

The visual style draws inspiration from 1980s synthwave and retro-futurism, utilizing:
- Cyan wireframe aesthetics (`rgb(0, 255, 255)`)
- Deep space blue background (`rgb(5, 5, 20)`)
- Fog/distance-based alpha fading for depth perception

---

## Dependencies & Setup

### Required Files

| File | Description |
|------|-------------|
| `3d-model.obj` | 3D model file for the player vehicle |
| p5.js library | Core library with WEBGL support |

### Canvas Configuration

```javascript
createCanvas(800, 600, WEBGL);
angleMode(DEGREES);
```

- **Resolution**: 800 × 600 pixels
- **Renderer**: WebGL (hardware-accelerated 3D)
- **Angle Mode**: Degrees (not radians)

---

## Global Variables

| Variable | Type | Description |
|----------|------|-------------|
| `playerModel` | p5.Geometry | Stores the loaded 3D model for the player |
| `stars` | Array\<Star\> | Collection of Star objects for the hyperspace effect |

---

## Core Functions

### preload()

```javascript
function preload() {
  playerModel = loadModel('3d-model.obj', true);
}
```

**Purpose**: Loads external assets before the sketch starts.

**Parameters**:
- `'3d-model.obj'`: Path to the 3D model file
- `true`: Normalize the model (scales to fit standard bounds)

**Called**: Automatically by p5.js before `setup()`

---

### setup()

```javascript
function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }
}
```

**Purpose**: Initializes the canvas and creates the star field.

**Operations**:
1. Creates an 800×600 WebGL canvas
2. Sets angle mode to degrees for easier rotation calculations
3. Populates the `stars` array with 150 `Star` instances

---

### draw()

```javascript
function draw() {
  background(5, 5, 20);
  camera(0, -200, 500, 0, 0, -2000, 0, 1, 0);
  ambientLight(100); 
  pointLight(255, 255, 255, 0, -500, 200);
  
  drawHyperSpeed();     
  drawRetroMoon();
  drawSaturn();      
  drawMovingTerrain(); 
  drawPlayer();
}
```

**Purpose**: Main render loop executed every frame (~60fps).

#### Camera Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Eye Position | `(0, -200, 500)` | Camera location in 3D space |
| Look-at Target | `(0, 0, -2000)` | Point the camera focuses on |
| Up Vector | `(0, 1, 0)` | Defines "up" direction (Y-axis) |

#### Lighting Setup

| Light Type | Parameters | Effect |
|------------|------------|--------|
| Ambient | `100` | Base illumination for all surfaces |
| Point Light | `(255,255,255)` at `(0, -500, 200)` | White light source above and in front |

#### Render Order

1. **Hyperspace Stars** - Background particle effect
2. **Retro Moon** - Left side celestial body
3. **Saturn** - Right side celestial body with rings
4. **Moving Terrain** - Ground plane with grid
5. **Player** - Foreground vehicle model

---

## Player System

### drawPlayer()

```javascript
function drawPlayer() {
  push();
  translate(0, 0, -200); 
  rotateX(180); 
  rotateY(0);   
  stroke(0, 255, 255); 
  strokeWeight(1.5); 
  fill(5, 5, 20);       
  model(playerModel);
  pop();
}
```

**Purpose**: Renders the player's vehicle as a wireframe model fixed at screen center.

#### Transformation Stack

| Operation | Value | Effect |
|-----------|-------|--------|
| `translate()` | `(0, 0, -200)` | Positions model 200 units into the scene |
| `rotateX()` | `180°` | Flips model upright (corrects OBJ orientation) |
| `rotateY()` | `0°` | No horizontal rotation |

#### Styling

| Property | Value | Visual Effect |
|----------|-------|---------------|
| `stroke` | `rgb(0, 255, 255)` | Cyan wireframe edges |
| `strokeWeight` | `1.5` | Medium-thickness lines |
| `fill` | `rgb(5, 5, 20)` | Dark fill matching background |

---

## Environment Systems

### drawRetroMoon()

```javascript
function drawRetroMoon() {
  push();
  translate(-1500, -1000, -3500);
  rotateY(frameCount * 0.2);
  // ... wireframe sphere generation
  pop();
}
```

**Purpose**: Renders a wireframe sphere representing a moon in the upper-left background.

#### Position & Animation

| Property | Value | Description |
|----------|-------|-------------|
| Position | `(-1500, -1000, -3500)` | Far left, above horizon |
| Rotation Speed | `0.2°/frame` | Slow Y-axis rotation |
| Radius | `600` units | Large celestial body |
| Resolution | `24` steps | Grid density for wireframe |

#### Wireframe Construction Algorithm

The moon is constructed using two sets of lines:

**Latitude Lines (Horizontal Rings)**:
```javascript
for (let i = 0; i <= steps; i++) {
  let lat = map(i, 0, steps, -90, 90);
  let y = r * sin(lat);        // Vertical position
  let ringR = r * cos(lat);    // Ring radius at this latitude
  // Draw circle at this latitude
}
```

**Longitude Lines (Vertical Arcs)**:
```javascript
for (let i = 0; i < steps; i++) {
  let lon = map(i, 0, steps, 0, 360);
  // Draw arc from pole to pole at this longitude
}
```

---

### drawSaturn()

```javascript
function drawSaturn() {
  push();
  translate(1800, -800, -4500);
  rotateZ(25);
  rotateY(frameCount * 0.15);
  // ... wireframe sphere + rings
  pop();
}
```

**Purpose**: Renders a wireframe Saturn with planetary rings in the upper-right background.

#### Position & Animation

| Property | Value | Description |
|----------|-------|-------------|
| Position | `(1800, -800, -4500)` | Far right, above horizon, very distant |
| Tilt | `25°` on Z-axis | Characteristic planetary tilt |
| Rotation Speed | `0.15°/frame` | Slower than moon |
| Planet Radius | `400` units | Smaller than moon (farther away) |
| Resolution | `20` steps | Slightly lower than moon |

#### Ring System

```javascript
rotateX(90);
for (let ring = 500; ring <= 700; ring += 50) {
  // Draw concentric circles
}
```

| Ring Property | Value |
|---------------|-------|
| Inner Radius | 500 units |
| Outer Radius | 700 units |
| Ring Count | 5 rings (50-unit spacing) |
| Segments | 48 vertices per ring |

---

### drawMovingTerrain()

```javascript
function drawMovingTerrain() {
  push();
  let offset = (millis() * 0.5) % 150;
  // ... terrain rendering
  pop();
}
```

**Purpose**: Renders an infinitely scrolling grid terrain with procedural height variation.

#### Terrain Dimensions

| Parameter | Value | Description |
|-----------|-------|-------------|
| Z Range | `-4000` to `500` | Depth extent |
| X Range | `-1500` to `1500` | Width extent |
| Grid Step | `150` units | Cell size |
| Scroll Speed | `0.5` pixels/ms | Forward motion |

#### Rendering Layers

**Layer 1: Solid Fill**
```javascript
noStroke();
fill(5, 5, 20);
beginShape(TRIANGLE_STRIP);
// Creates solid ground to hide gaps
```

**Layer 2: Horizontal Grid Lines**
```javascript
for (let z = terrainZStart; z <= terrainZEnd; z += step) {
  let alpha = map(movingZ, terrainZStart, terrainZEnd, 0, 255);
  stroke(0, 255, 255, alpha);  // Fog fade effect
  // Draw line across X axis
}
```

**Layer 3: Vertical Grid Lines**
```javascript
for (let x = terrainXStart; x <= terrainXEnd; x += step) {
  // Draw lines along Z axis with fog fade
}
```

#### Fog Effect

Lines fade based on distance:
- **Near (z = 500)**: Full opacity (alpha = 255)
- **Far (z = -4000)**: Transparent (alpha = 0)
- Lines with alpha < 20 are skipped for performance

---

### getTerrainHeight()

```javascript
function getTerrainHeight(x, z) {
  let roadWidth = 600;
  if (abs(x) < roadWidth) {
    return 0;
  } else {
    let noiseVal = noise(x * 0.0015, z * 0.001);
    return map(noiseVal, 0, 1, 0, 350);
  }
}
```

**Purpose**: Calculates terrain height at any (x, z) coordinate using Perlin noise.

#### Road System

| Zone | Condition | Height |
|------|-----------|--------|
| Road | `abs(x) < 600` | Always `0` (flat) |
| Terrain | `abs(x) >= 600` | Noise-based (0-350) |

#### Noise Parameters

| Parameter | Value | Effect |
|-----------|-------|--------|
| X Scale | `0.0015` | Horizontal frequency |
| Z Scale | `0.001` | Depth frequency (lower = smoother) |
| Height Range | `0` to `350` | Maximum terrain elevation |

---

## Particle Systems

### drawHyperSpeed()

```javascript
function drawHyperSpeed() {
  push();
  strokeWeight(2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();
}
```

**Purpose**: Updates and renders all stars in the hyperspace effect.

---

### Star Class

```javascript
class Star {
  constructor() {
    this.x = random(-2000, 2000);
    this.y = random(-2000, 2000);
    this.z = random(-3000, 400);
    this.speed = random(20, 50);
  }
  
  update() {
    this.z += this.speed;
    if (this.z > 500) {
      this.z = -3000;
      this.x = random(-2000, 2000);
      this.y = random(-2000, 2000);
    }
  }
  
  show() {
    let length = map(this.z, -3000, 500, 10, 300);
    stroke(200, 230, 255);
    line(this.x, this.y, this.z, this.x, this.y, this.z - length);
  }
}
```

**Purpose**: Represents a single star streak in the hyperspace effect.

#### Properties

| Property | Range | Description |
|----------|-------|-------------|
| `x` | -2000 to 2000 | Horizontal position |
| `y` | -2000 to 2000 | Vertical position |
| `z` | -3000 to 400 | Depth position |
| `speed` | 20 to 50 | Z-axis velocity |

#### Methods

**`update()`**
- Moves star toward camera (`z += speed`)
- Resets star to far distance when it passes the camera
- Randomizes x/y on reset for variety

**`show()`**
- Draws a line representing motion blur
- Line length increases as star approaches (10 to 300 units)
- Color: Cool white-blue (`rgb(200, 230, 255)`)

---

## Technical Specifications

### Performance Considerations

| System | Count/Complexity | Optimization |
|--------|------------------|--------------|
| Stars | 150 particles | Simple line primitives |
| Terrain Grid | ~900 cells | Alpha culling (< 20) |
| Moon | 24×24 resolution | Static geometry |
| Saturn | 20×20 + 5 rings | Static geometry |

### Coordinate System

```
        +Y (up)
         |
         |
         |_______ +X (right)
        /
       /
      +Z (toward camera)
```

### Z-Depth Reference

| Object | Z Position | Distance |
|--------|------------|----------|
| Player | -200 | Foreground |
| Terrain End | 500 | Near |
| Stars Reset | 500 | Near |
| Terrain Start | -4000 | Far |
| Moon | -3500 | Background |
| Saturn | -4500 | Deep Background |

---

## Visual Style Guide

### Color Palette

| Element | RGB | Hex | Usage |
|---------|-----|-----|-------|
| Background | `(5, 5, 20)` | `#050514` | Deep space |
| Primary Accent | `(0, 255, 255)` | `#00FFFF` | Wireframes, grid |
| Star Color | `(200, 230, 255)` | `#C8E6FF` | Hyperspace streaks |

### Stroke Weights

| Element | Weight |
|---------|--------|
| Player Model | 1.5 |
| Celestial Bodies | 2.0 |
| Terrain Grid | 1.5 |
| Star Streaks | 2.0 |

{% raw %}
<iframe src="./content/day01/13/embed.html" width="800" height="600" frameborder="no"></iframe>
{% endraw %} 

---

## Future Enhancement Ideas

- [ ] Add keyboard controls for player movement
- [ ] Implement collision detection with terrain
- [ ] Add more celestial bodies (asteroids, nebulae)
- [ ] Include audio-reactive elements
- [ ] Add score/distance counter
- [ ] Implement difficulty progression (speed increase)

---
