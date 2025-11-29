function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES); // Easier to think in 0-360 degrees for a circle
}

function draw() {
  background(10, 10, 10); // Dark background for contrast

  // Centering the clock
  translate(width / 2, height / 2);
  rotate(-90); // Rotate -90 degrees so 0 starts at the TOP (12 o'clock)

  // 1. Get current time
  let h = hour();
  let m = minute();
  let s = second();
  
  // 2. Calculate angles (Map time to 0-360 degrees)
  // We use s + (millis() % 1000) / 1000 for smooth second movement
  let scAngle = map(s, 0, 60, 0, 360);
  let mnAngle = map(m, 0, 60, 0, 360);
  let hrAngle = map(h % 12, 0, 12, 0, 360); // 12-hour format

  // 3. Setup the Glow Style
  noFill();
  strokeWeight(8);
  strokeCap(ROUND); // Makes the ends of the lines round

  // --- SECONDS (Outer Ring) ---
  push();
  // This makes it GLOW
  drawingContext.shadowBlur = 20; 
  drawingContext.shadowColor = color(200, 100, 100); // Blue Glow
  stroke(200, 100, 100);
  
  // Draw the arc: x, y, width, height, startAngle, stopAngle
  arc(0, 0, 300, 300, 0, scAngle);
  pop();

  // --- MINUTES (Middle Ring) ---
  push();
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(100, 100, 100); // Green Glow
  stroke(100, 100, 100);
  arc(0, 0, 260, 260, 0, mnAngle);
  pop();

  // --- HOURS (Inner Ring) ---
  push();
  drawingContext.shadowBlur = 20;
  drawingContext.shadowColor = color(330, 100, 100); // Pink Glow
  stroke(330, 100, 100);
  arc(0, 0, 220, 220, 0, hrAngle);
  pop();
  
  // Center Dot (Pulsing)
  noStroke();
  fill(255);
  // Uses sin() to make the center dot breathe every second
  let pulse = map(sin(millis() / 5), -1, 1, 5, 15); 
  ellipse(0, 0, pulse);
}