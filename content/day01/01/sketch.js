let r1 = 150;
let r2 = 150;
let m1 = 10;
let m2 = 10;
let a1 = Math.PI / 2;
let a2 = Math.PI / 2;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let history = []; // To store the path of the second mass

function setup() {
  createCanvas(800, 600);
  angleMode(RADIANS);
  // Initial starting angles (adjust for variation 1)
  a1 = Math.PI / 2 + 0.01; 
  a2 = Math.PI / 2;
  // Adjust length for variation 2
  // r1 = 100;
  // r2 = 200;
}

function draw() {
  background(0);
  translate(width / 2, height / 4);

  // --- Physics Calculation ---
  // Numerators for angular acceleration (a1_a, a2_a)
  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * Math.sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * Math.cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));

  let a2_a = (num1 * (num2 + num3 + num4)) / den;


  // --- Position Calculation ---
  let x1 = r1 * Math.sin(a1);
  let y1 = r1 * Math.cos(a1);

  let x2 = x1 + r2 * Math.sin(a2);
  let y2 = y1 + r2 * Math.cos(a2);

  // --- Drawing ---
  // Line 1
  stroke(255);
  strokeWeight(2);
  line(0, 0, x1, y1);
  
  // Mass 1
  fill(255);
  ellipse(x1, y1, m1 * 2);

  // Line 2
  stroke(255);
  line(x1, y1, x2, y2);
  
  // Mass 2
  fill(255);
  ellipse(x2, y2, m2 * 2);
  
  // Record the path
  history.push(createVector(x2, y2));
  
  // --- Draw the Path (The Machine's Drawing) ---
  beginShape();
  stroke(255, 100, 150, 200); // Pinkish trail
  noFill();
  strokeWeight(1.5); // Adjust thickness for variation 3
  for (let i = 0; i < history.length; i++) {
    let pos = history[i];
    vertex(pos.x, pos.y);
  }
  endShape();
  
  // --- Update Angles ---
  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  // Add a slight friction/damping
  a1_v *= 0.9999; 
  a2_v *= 0.9999;

  // Keep history manageable
  if (history.length > 500) {
    history.shift();
  }
}

// *** To create 3 drawings: ***
// 1. Change the initial angles (a1, a2) in setup(). (e.g., a1 = PI/4, a2 = 0)
// 2. Change the rod lengths (r1, r2) in setup(). (e.g., r1=100, r2=200)
// 3. Change the stroke color/weight for the trail (the drawing) in draw().
