// WEEK 10: TRON BIKE DESIGN PROTOTYPE
// Focus: 3D Modeling, Materials, and Lighting

function setup() {
  createCanvas(600, 600, WEBGL);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(5, 5, 12); // Deep midnight blue background
  
  // 1. CINEMATIC LIGHTING
  ambientLight(40); // Dim general light
  
  // Key Light (Cyan) - Illuminates the grid and bike top
  pointLight(0, 255, 255, 0, -300, 100); 
  
  // Rim Light (Magenta) - Highlights the bike's edges
  pointLight(255, 0, 255, 200, 0, 0);

  // 2. CAMERA POSITION
  // Angled low and to the side to show off the 3D depth
  camera(120, -100, 350, 0, 0, 0, 0, 1, 0);

  // 3. DRAW ENVIRONMENT
  drawInfiniteGrid();

  // 4. DRAW THE MODEL
  // We rotate it slightly so we can see the side profile
  rotateY(-10); 
  drawTronBike();
}

function drawInfiniteGrid() {
  push();
  rotateX(90); // Lay flat
  stroke(0, 200, 255); // Cyan Neon
  strokeWeight(2);
  
  // Slow, majestic speed
  let speed = 0.15; 
  let offset = (millis() * speed) % 100; 

  // Floor Grid
  for (let x = -800; x <= 800; x += 100) {
    line(x, -800, x, 800);
  }
  for (let y = -800; y <= 800; y += 100) {
    let movingY = y + offset;
    line(-800, movingY, 800, movingY);
  }
  pop();
}

function drawTronBike() {
  // --- THE CHASSIS (Body) ---
  push();
  fill(15); // Almost black
  specularMaterial(255); // Makes it shiny/reflective
  shininess(50);
  
  translate(0, -25, 0);
  
  // Main Body (Long and sleek)
  // We use a box, but you could stack boxes for more detail
  box(30, 35, 90); 
  
  // Windshield / Top detail
  translate(0, -18, 10);
  fill(30);
  box(28, 5, 40);
  pop();

  // --- REAR WHEEL (Big Power Wheel) ---
  push();
  translate(0, -20, -45); // Back position
  rotateZ(90);
  
  // The Tire (Rubber)
  fill(10);
  cylinder(35, 20); 
  
  // The Neon Rim (Light)
  emissiveMaterial(255, 0, 255); // Magenta Glow
  fill(255, 0, 255);
  torus(35, 2); // Ring
  torus(20, 2); // Inner Ring
  pop();
  
  // --- FRONT WHEEL ---
  push();
  translate(0, -20, 45); // Front position
  rotateZ(90);
  
  // The Tire
  fill(10);
  cylinder(35, 20); 
  
  // The Neon Rim
  emissiveMaterial(255, 0, 255); 
  fill(255, 0, 255);
  torus(35, 2); 
  torus(20, 2);
  pop();
}