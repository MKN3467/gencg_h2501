let particles = [];
let numParticles = 50; // Adjust for density variation 1
let maxHistory = 10; // How many previous positions to remember

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.r = 2;
    this.history = []; // Drawing trail
  }

  // Calculate forces: mouse attraction and mutual repulsion
  applyForces() {
    // 1. Mouse Attraction
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    dir.setMag(0.1); // Adjust for attraction strength
    this.acc.add(dir);

    // 2. Mutual Repulsion (Constraint)
    for (let other of particles) {
      if (other !== this) {
        let force = p5.Vector.sub(this.pos, other.pos);
        let d = force.mag();
        let min_d = 20; // Repulsion distance (adjust for variation 2)
        if (d < min_d) {
          force.setMag(-0.5 / (d * d)); // Repel with inverse-square-like force
          this.acc.add(force);
        }
      }
    }
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5); // Speed limit (Constraint)
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration

    // Update history (Mark-Making)
    this.history.push(this.pos.copy());
    if (this.history.length > maxHistory) {
      this.history.shift();
    }
  }

  show() {
    noFill();
    beginShape();
    
    // Draw trail (Mark-Making: opacity based on age)
    for (let i = 0; i < this.history.length; i++) {
      let p = this.history[i];
      let alpha = map(i, 0, maxHistory, 10, 255); // Older points are more transparent
      let w = map(i, 0, maxHistory, 0.5, 2); // Thinner line for older points (Variation 3)
      stroke(200, 150, 255, alpha); // Purple trail
      strokeWeight(w);
      vertex(p.x, p.y);
    }
    endShape();
  }
}

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(0, 50); // Semi-transparent background for a fading effect

  for (let p of particles) {
    p.applyForces();
    p.update();
    p.show();
  }
}

// *** To create 3 drawings: ***
// 1. Change the number of particles (numParticles). (e.g., 10 for sparse, 100 for dense)
// 2. Adjust the repulsion distance (min_d) inside Particle.applyForces(). (e.g., 5 for close, 50 for wide gaps)
// 3. Change the line width mapping (w) and color inside Particle.show().