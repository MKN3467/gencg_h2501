// FINAL PROJECT: DEEP SPACE RUN (Fixed Center Version)
// Features: Square Grid Terrain + Square Grid Moon (1 Axis) + Fixed Center Wireframe Car

let playerModel; 
let stars = [];

function preload() {
  playerModel = loadModel('3d-model.obj', true);
}

function setup() {
  createCanvas(800, 600, WEBGL);
  angleMode(DEGREES);
  
  // Initialize Stars
  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(5, 5, 20); // Deep Space Blue

  // --- CAMERA ---
  camera(0, -200, 500, 0, 0, -2000, 0, 1, 0);

  // --- LIGHTING ---
  ambientLight(100); 
  pointLight(255, 255, 255, 0, -500, 200);
  
  // --- DRAW SCENE ---
  drawHyperSpeed();     
  drawRetroMoon();
  drawSaturn();      
  drawMovingTerrain(); 
  
  // --- DRAW PLAYER ---
  drawPlayer();
}

// ✅ UPDATED: PLAYER IS NOW FIXED IN THE CENTER
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

// --- ENVIRONMENT ---

function drawRetroMoon() {
  push();
  translate(-1500, -1000, -3500); 
  rotateY(frameCount * 0.2); 
  noFill();             
  stroke(0, 255, 255);  
  strokeWeight(2);      
  
  let r = 600;    
  let steps = 24; 

  for (let i = 0; i <= steps; i++) {
    let lat = map(i, 0, steps, -90, 90);
    let y = r * sin(lat);        
    let ringR = r * cos(lat);    
    push();
    translate(0, y, 0);
    rotateX(90); 
    beginShape();
    for (let j = 0; j <= steps; j++) {
      let lon = map(j, 0, steps, 0, 360);
      vertex(ringR * cos(lon), ringR * sin(lon), 0);
    }
    endShape();
    pop();
  }

  for (let i = 0; i < steps; i++) {
    let lon = map(i, 0, steps, 0, 360);
    push();
    rotateY(lon); 
    beginShape();
    for (let j = 0; j <= steps; j++) {
      let lat = map(j, 0, steps, -90, 90);
      vertex(0, r * sin(lat), r * cos(lat));
    }
    endShape();
    pop();
  }
  pop();
}

function drawSaturn() {
  push();
  translate(1800, -800, -4500); 
  rotateZ(25);
  rotateY(frameCount * 0.15); 
  noFill();             
  stroke(0, 255, 255);  
  strokeWeight(2);      
  
  let r = 400;    
  let steps = 20; 

  for (let i = 0; i <= steps; i++) {
    let lat = map(i, 0, steps, -90, 90);
    let y = r * sin(lat);        
    let ringR = r * cos(lat);    
    push();
    translate(0, y, 0);
    rotateX(90); 
    beginShape();
    for (let j = 0; j <= steps; j++) {
      let lon = map(j, 0, steps, 0, 360);
      vertex(ringR * cos(lon), ringR * sin(lon), 0);
    }
    endShape();
    pop();
  }

  for (let i = 0; i < steps; i++) {
    let lon = map(i, 0, steps, 0, 360);
    push();
    rotateY(lon); 
    beginShape();
    for (let j = 0; j <= steps; j++) {
      let lat = map(j, 0, steps, -90, 90);
      vertex(0, r * sin(lat), r * cos(lat));
    }
    endShape();
    pop();
  }

  rotateX(90);
  for (let ring = 500; ring <= 700; ring += 50) {
    beginShape();
    for (let j = 0; j <= 48; j++) {
      let angle = map(j, 0, 48, 0, 360);
      vertex(ring * cos(angle), ring * sin(angle), 0);
    }
    endShape(CLOSE);
  }
  
  pop();
}

function drawMovingTerrain() {
  push();
  let offset = (millis() * 0.5) % 150; 
  let terrainZStart = -4000;
  let terrainZEnd = 500;
  let terrainXStart = -1500;
  let terrainXEnd = 1500;
  let step = 150;

  noStroke();
  fill(5, 5, 20); 
  for (let z = terrainZStart; z < terrainZEnd; z += step) {
    let movingZ = z + offset;
    let nextZ = movingZ + step;
    beginShape(TRIANGLE_STRIP);
    for (let x = terrainXStart; x <= terrainXEnd; x += step) {
      let y1 = getTerrainHeight(x, movingZ);
      let y2 = getTerrainHeight(x, nextZ);
      vertex(x, 200 - y1, movingZ);
      vertex(x, 200 - y2, nextZ);
    }
    endShape();
  }

  strokeWeight(1.5);
  noFill();

  // Horizontal grid lines with fog fade
  for (let z = terrainZStart; z <= terrainZEnd; z += step) {
    let movingZ = z + offset;
    let alpha = map(movingZ, terrainZStart, terrainZEnd, 0, 255);
    alpha = constrain(alpha, 0, 255);
    if (alpha < 20) continue; // Skip nearly invisible lines
    stroke(0, 255, 255, alpha);
    beginShape(); 
    for (let x = terrainXStart; x <= terrainXEnd; x += step) {
      let y = getTerrainHeight(x, movingZ);
      vertex(x, 200 - y - 1, movingZ); 
    }
    endShape();
  }

  // Vertical grid lines with fog fade
  for (let x = terrainXStart; x <= terrainXEnd; x += step) {
    for (let z = terrainZStart; z <= terrainZEnd - step; z += step) {
      let movingZ = z + offset;
      let nextZ = movingZ + step;
      let alpha = map(movingZ, terrainZStart, terrainZEnd, 0, 255);
      alpha = constrain(alpha, 0, 255);
      if (alpha < 20) continue; // Skip nearly invisible lines
      stroke(0, 255, 255, alpha);
      let y1 = getTerrainHeight(x, movingZ);
      let y2 = getTerrainHeight(x, nextZ);
      line(x, 200 - y1 - 1, movingZ, x, 200 - y2 - 1, nextZ);
    }
  }
  pop();
}

function getTerrainHeight(x, z) {
  let roadWidth = 600; 
  if (abs(x) < roadWidth) {
    return 0; 
  } else {
    let noiseVal = noise(x * 0.0015, z * 0.001);
    return map(noiseVal, 0, 1, 0, 350);
  }
}

function drawHyperSpeed() {
  push();
  strokeWeight(2);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
  pop();
}

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