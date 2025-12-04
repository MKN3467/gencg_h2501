// WEEK 9 PROTOTYPE: 3D Infinite Grid (The Tron Road)

function setup() {
  createCanvas(600, 600, WEBGL); // Switch to 3D mode
  angleMode(DEGREES);
}

function draw() {
  background(10); // Dark background
  
  // 1. Camera / View Setup
  // Lift camera up and look down slightly
  translate(0, -50, 200); 
  rotateX(60); // Tilt floor to create perspective

  // 2. The Glowing Grid
  stroke(0, 255, 255); // Cyan Neon
  strokeWeight(2);
  noFill();

  // 3. Infinite Movement Logic
  // We use millis() to shift the grid
  let speed = 0.2;
  let offset = (millis() * speed) % 100; // Loops every 100 pixels

  // 4. Draw the Grid Lines
  // Vertical Lines (The Lanes)
  for (let x = -600; x <= 600; x += 100) {
    line(x, -600, 0, x, 600, 0);
  }
  
  // Horizontal Lines (The Speed markers)
  // We add 'offset' to z to make them move towards us
  for (let z = -600; z <= 600; z += 100) {
    let movingZ = z + offset;
    line(-600, movingZ, 0, 600, movingZ, 0);
  }
  
  // 5. The Bike Placeholder
  push();
  stroke(255, 0, 255); // Magenta Bike
  fill(20);
  translate(0, 200, 50); // Position "on" the road
  rotateX(-60); // Un-rotate so the box stands up
  box(40, 60, 100); // Temporary 3D Box Bike
  pop();
  
  // 6. Glow Effect (Simple Ambient)
  // WEBGL doesn't support shadowBlur well, so we simulate feel with color
  ambientLight(100);
  pointLight(0, 255, 255, 0, 0, 100);
}