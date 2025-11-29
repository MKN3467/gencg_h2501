function setup() {
  // Create a canvas 
  createCanvas(600, 600);
  // We only run this once to generate a static "drawing"
  noLoop(); 
}

function draw() {
  // 1. Background: Off-white to look like paper
  background(245, 243, 240);
  
  // 2. Setup "Pencil" style
  noFill();
  stroke(40); // Dark grey like graphite
  strokeWeight(1.5);

  // 3. Define Grid Size
  let cellSize = 50;

  // 4. Nested Loop: Go through every column and row
  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      
      // Call our custom function to draw one diamond at this position
      drawSketchyDiamond(x, y, cellSize);
    }
  }
}

// Custom function to draw a diamond with a "hand-drawn" feel
function drawSketchyDiamond(x, y, size) {
  let half = size / 2;
  
  // To make it look like your sketch, we add a tiny bit of randomness
  // so the lines aren't perfectly straight computer lines.
  let jitter = 2; 

  beginShape();
    // Top point (midpoint of top edge)
    vertex(x + half + random(-jitter, jitter), y + random(-jitter, jitter));
    // Right point
    vertex(x + size + random(-jitter, jitter), y + half + random(-jitter, jitter));
    // Bottom point
    vertex(x + half + random(-jitter, jitter), y + size + random(-jitter, jitter));
    // Left point
    vertex(x + random(-jitter, jitter), y + half + random(-jitter, jitter));
  endShape(CLOSE);
  
  // OPTIONAL: Draw a second time slightly offset to mimic the "scribble" in your photo
  strokeWeight(0.8);
  beginShape();
    vertex(x + half + random(-jitter, jitter), y + random(-jitter, jitter));
    vertex(x + size + random(-jitter, jitter), y + half + random(-jitter, jitter));
    vertex(x + half + random(-jitter, jitter), y + size + random(-jitter, jitter));
    vertex(x + random(-jitter, jitter), y + half + random(-jitter, jitter));
  endShape(CLOSE);
}