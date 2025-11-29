function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  // 1. Interactive Background
  // Subtle color shift based on mouse X
  let baseHue = map(mouseX, 0, width, 0, 360);
  background(baseHue, 10, 5); 

  translate(width / 2, height / 2);
  rotate(-90); // Start at the top

  // 2. Get ULTRA SMOOTH Time
  // We use the native JS Date object to get precise milliseconds
  let now = new Date();
  let ms = now.getMilliseconds();
  let s = now.getSeconds();
  let m = now.getMinutes();
  let h = now.getHours();

  // Calculate precise float values
  let smoothSec = s + (ms / 1000.0);
  let smoothMin = m + (smoothSec / 60.0);
  let smoothHour = (h % 12) + (smoothMin / 60.0);
  
  // 3. Map Time to Angles (0 to 360 degrees)
  let scAngle = map(smoothSec, 0, 60, 0, 360);
  let mnAngle = map(smoothMin, 0, 60, 0, 360);
  let hrAngle = map(smoothHour, 0, 12, 0, 360);

  // 4. Global Interactive Glow
  // Moving mouse Y changes how "intense" the neon glow is
  let glowIntensity = map(mouseY, 0, height, 10, 50);

  // --- DRAWING FUNCTIONS ---
  
  // SECONDS (Outer Orbit) - Blue/Base Hue
  drawOrbit(300, scAngle, color(baseHue, 80, 100), glowIntensity, 8);
  
  // MINUTES (Middle Orbit) - Shift Hue by 30
  drawOrbit(240, mnAngle, color((baseHue + 30) % 360, 80, 100), glowIntensity, 12);

  // HOURS (Inner Orbit) - Shift Hue by 60
  drawOrbit(180, hrAngle, color((baseHue + 60) % 360, 80, 100), glowIntensity, 16);
  
  // Center Sun
  noStroke();
  fill(255);
  drawingContext.shadowBlur = glowIntensity * 2;
  drawingContext.shadowColor = color(255);
  ellipse(0, 0, 15);
}

// Custom function to draw the Ring AND the Particle (Electron)
function drawOrbit(diameter, angle, col, glow, weight) {
  push();
  
  // A. The Neon Arc
  drawingContext.shadowBlur = glow;
  drawingContext.shadowColor = col;
  stroke(col);
  strokeWeight(weight);
  strokeCap(ROUND);
  noFill();
  
  // Draw the arc
  // We use max(angle, 0.1) to avoid a glitch when angle is exactly 0
  arc(0, 0, diameter, diameter, 0, angle);
  
  // B. The Particle "Electron" at the tip
  let radius = diameter / 2;
  // Convert polar coordinates (angle) to cartesian (x, y)
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;
  
  noStroke();
  fill(255); // White hot core
  drawingContext.shadowBlur = glow / 2; // Particle has slightly less glow for clarity
  ellipse(x, y, weight * 1.5);
  
  pop();
}