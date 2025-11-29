# Week 02: Grids and Patterns

## Exploration & Experimentation
I started by sketching a repeating diamond pattern on paper to understand the geometry.

![Hand drawn diamond sketch](./images/crystalSketch.jpg)

**My Process:**
1.  I drew diagonal lines crossing each other.
2.  I noticed that this creates a lattice structure.
3.  To translate this to code, I realized I didn't need to draw long diagonal lines across the whole screen. Instead, I could treat it as a grid of squares where each square contains a diamond shape connecting the midpoints.

## Algorithmic Thinking
To recreate the "sketchy" quality of my drawing, I developed a system:

* **Grid System:** A nested `for` loop iterates through `x` and `y` coordinates with a step size of 50px.
* **Geometry:** In every cell, I calculate four points:
    * Top: `(x + size/2, y)`
    * Right: `(x + size, y + size/2)`
    * Bottom: `(x + size/2, y + size)`
    * Left: `(x, y + size/2)`
* **Variation (The "Hand-drawn" look):** Pure computer lines looked too perfect compared to my pencil sketch. I added a `random(-jitter, jitter)` offset to every vertex coordinates to simulate the imperfection of a human hand.

## Code Experiment
Here is the code where I implemented the diamond grid:

```javascript
// Function to draw the diamond shape
function drawSketchyDiamond(x, y, size) {
  let half = size / 2;
  let jitter = 2; // Adds the "sketchy" look

  beginShape();
    vertex(x + half + random(-jitter, jitter), y + random(-jitter, jitter));
    vertex(x + size + random(-jitter, jitter), y + half + random(-jitter, jitter));
    vertex(x + half + random(-jitter, jitter), y + size + random(-jitter, jitter));
    vertex(x + random(-jitter, jitter), y + half + random(-jitter, jitter));
  endShape(CLOSE);

  ![Final p5.js Output](./images/output_02.png)

## Critical Reflection
* **From Paper to Code:** Sketching first was essential. On paper, I naturally drew imperfect lines. If I had started directly in p5.js, I probably would have used `line()` or `rect()` and ended up with a perfect, sterile grid. The sketch forced me to figure out *how* to mimic imperfection (using `random` offsets) rather than accepting the default precision of the computer.
* **Balancing Order and Chaos:** The grid provides the "Order"—every diamond is centered exactly 50px apart. The "Chaos" comes from the `jitter` variable. I found that a jitter of 2px was the sweet spot; anything higher made the diamonds unrecognizable, and anything lower looked too perfect.
* **Learnings:** I learned that complex textures often come from repeating very simple rules with slight variations. The pattern feels "infinite" because the logic (nested loops) can extend indefinitely, unlike my drawing which was limited by the paper edge.
* **Next Steps:** I am curious to see what happens if I animate the jitter. Could I make the lines "vibrate" like a nervous hand? I also want to explore adding color fill to random diamonds to create a moiré effect.
}