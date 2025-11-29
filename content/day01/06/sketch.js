// PARAMETRIC WOMAN GENERATOR
// Based on hand-drawn sketch

let eyeOpenness; // Controls height of the eyelids
let mouthMood;   // Controls the smile/neutral curve
let hasHair;     // Toggle for hair
let faceScale;   // Subtle size variation

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  // Using specific stroke settings to look like ink
  strokeCap(ROUND);
  strokeJoin(ROUND);
  
  generateFace();
}

function draw() {
  background(245); // Paper color
  translate(width/2, height/2);
  scale(faceScale);

  stroke(20); // Dark graphite color
  strokeWeight(2);
  fill(255);

  // --- 1. HAIR (Back Layer) ---
  if (hasHair) {
    fill(20);
    noStroke();
    // Long hair falling behind
    beginShape();
    vertex(-90, 0);
    curveVertex(-100, -100);
    curveVertex(0, -160);
    curveVertex(100, -100);
    vertex(90, 0);
    vertex(120, 200);
    vertex(-120, 200);
    endShape(CLOSE);
  }

  // --- 2. FACE SHAPE (Jawline) ---
  fill(255);
  stroke(20);
  strokeWeight(2.5);
  beginShape();
    curveVertex(0, -150);   // Top reference
    curveVertex(0, -140);   // Forehead Top
    curveVertex(-85, -80);  // Left Temple
    curveVertex(-80, 20);   // Left Cheekbone
    curveVertex(-50, 130);  // Left Jaw
    curveVertex(0, 155);    // Chin (Pointy/Narrow)
    curveVertex(50, 130);   // Right Jaw
    curveVertex(80, 20);    // Right Cheekbone
    curveVertex(85, -80);   // Right Temple
    curveVertex(0, -140);   // Close loop
    curveVertex(0, -150);   
  endShape();

  // --- 3. EARS ---
  noFill();
  strokeWeight(2);
  // Left Ear
  beginShape();
    vertex(-82, -10);
    bezierVertex(-100, -20, -100, 40, -78, 30);
  endShape();
  // Right Ear
  beginShape();
    vertex(82, -10);
    bezierVertex(100, -20, 100, 40, 78, 30);
  endShape();

  // --- 4. EYES (Almond Shape + Lashes) ---
  // Parameter: eyeOpenness affects the TOP eyelid height mainly
  let eyeY = -10;
  let eyeW = 38;
  
  drawEye(-45, eyeY, eyeW, eyeOpenness, true);  // Left
  drawEye(45, eyeY, eyeW, eyeOpenness, false); // Right

  // --- 5. EYEBROWS ---
  // Filled "ink" style brows, slightly arched
  fill(20);
  noStroke();
  
  // Left Brow
  beginShape();
    vertex(-25, -50); 
    bezierVertex(-35, -58, -55, -58, -75, -45); // Top arch
    vertex(-80, -42); // Tail
    bezierVertex(-60, -50, -40, -50, -25, -45); // Bottom arch
  endShape(CLOSE);

  // Right Brow
  beginShape();
    vertex(25, -50); 
    bezierVertex(35, -58, 55, -58, 75, -45); 
    vertex(80, -42); 
    bezierVertex(60, -50, 40, -50, 25, -45); 
  endShape(CLOSE);

  // --- 6. NOSE ---
  // Outline based on your sketch (nostrils + side definition)
  noFill();
  stroke(20);
  strokeWeight(2);
  
  // Nostrils
  beginShape();
    vertex(-12, 65);
    curveVertex(-6, 70);
    curveVertex(0, 72);
    curveVertex(6, 70);
    vertex(12, 65);
  endShape();
  
  // Side definitions (Bridge)
  strokeWeight(1.5);
  line(-14, 62, -12, 55);
  line(14, 62, 12, 55);

  // --- 7. MOUTH (Full Lips) ---
  // Parameter: mouthMood affects the corners
  let mouthY = 105;
  stroke(20);
  strokeWeight(2);
  fill(255);
  
  // Upper Lip (Cupid's Bow)
  beginShape();
    vertex(-25, mouthY - mouthMood); // Left corner (moves with mood)
    bezierVertex(-10, mouthY-10, -5, mouthY-8, 0, mouthY-5); // Left peak
    bezierVertex(5, mouthY-8, 10, mouthY-10, 25, mouthY - mouthMood); // Right peak/corner
    // Bottom line of upper lip
    bezierVertex(5, mouthY+2, -5, mouthY+2, -25, mouthY - mouthMood);
  endShape();
  
  // Lower Lip (Full U shape)
  beginShape();
    vertex(-25, mouthY - mouthMood);
    bezierVertex(-15, mouthY+20, 15, mouthY+20, 25, mouthY - mouthMood);
    // Top line of lower lip (connects to upper)
    vertex(-25, mouthY - mouthMood);
  endShape();
}

function drawEye(x, y, w, open, isLeft) {
  push();
  translate(x, y);
  
  stroke(20);
  strokeWeight(2);
  fill(255);
  
  // 1. The Eye Outline (Almond)
  beginShape();
    vertex(-w/2, 0); // Outer corner
    // Top Lid (Controlled by parameter)
    bezierVertex(-w/4, -open, w/4, -open, w/2, 0);
    // Bottom Lid (Flatter)
    bezierVertex(w/4, open/2, -w/4, open/2, -w/2, 0);
  endShape();
  
  // 2. Iris & Pupil
  // Only draw if eye is open enough
  if (open > 5) {
    strokeWeight(1);
    // Iris
    fill(255);
    circle(0, 0, 22);
    // Pupil
    fill(20);
    circle(0, 0, 8);
    // Shine
    fill(255);
    circle(3, -3, 3);
  }
  
  // 3. Eyelid Crease (The line above the eye in your sketch)
  noFill();
  stroke(20);
  strokeWeight(1);
  arc(0, -open - 5, w, 10, 180, 0);
  
  // 4. Eyelashes (Feminine Feature)
  // Draw 3 small lashes on the outer top edge
  strokeWeight(1.5);
  if (isLeft) {
    line(-15, -open+2, -22, -open-5);
    line(-10, -open, -15, -open-8);
    line(-5, -open+1, -8, -open-8);
  } else {
    line(15, -open+2, 22, -open-5);
    line(10, -open, 15, -open-8);
    line(5, -open+1, 8, -open-8);
  }
  
  pop();
}

function generateFace() {
  // 1. EYES: Close (5) to Open (18)
  eyeOpenness = random(6, 18);
  
  // 2. MOOD: Sad (-5) to Happy (5)
  mouthMood = random(-2, 5); 
  
  // 3. HAIR: 50/50 Chance
  hasHair = random() > 0.5;
  
  // 4. FACE SCALE: Slight variation
  faceScale = random(0.9, 1.1);
}

function mousePressed() {
  generateFace();
}