# Week 1: Introduction & Foundations

## Exploration & Experimentation

This week's focus was on the foundational concepts of generative art, contrasting the precision of computers with human subjectivity, and engaging in analog, system-based exercises.

I started by setting up my coding environment, cloning the repository, and familiarizing myself with the P5.js environment. The core of my initial exploration was the analog exercises from the lecture, which served as a warm-up for algorithmic thinking without a computer.

Moniker: The Beach (Self-Organization): This involved simulating the "empty place, position yourself right in the middle" rule. My hand-drawn result quickly led to a highly dense, uniform distribution, illustrating how a simple, local rule (avoiding immediate neighbors) leads to a complex, global, self-organized pattern. The physical process helped me consider what an iteration loop would look like in code: For every person/point, check distance to all others, find largest free space, move to center of that space.

Wall Drawing 118 (Complexity from Simplicity): Connecting 50 random points with straight lines. The output was a web of overwhelming complexity, proving how a simple global rule (connect all points) can generate maximum visual density and chaos. This will be a great test case for the line() and random() functions in p5.js later on.

Draw then Code: I completed the initial Trees exercise to practice using ellipse(), triangle(), and line(). This was essential for understanding how to translate a concept (a tree) into geometric primitives.

### Technical Challanges

Initial setup of the P5.js local server environment, ensuring the sketch.js file and the embed.html worked correctly. This was a minor setup issue, quickly resolved.

## Influences & References

The core reference this week is Vera Molnár. Her practice of documenting algorithmic thinking in notebooks before having computer access is the direct inspiration for this journal.   


Artist: Vera Molnár    


Concept: "Machine Imaginaire" (Imaginary Machine).   


Connection: This concept stresses the importance of defining the algorithmic rule and constraints before execution. This directly connects to the foundational lesson that art is a matter of logic, and intuition must be aided by cognition. My analog exercises were essentially running my "imaginary machine" by hand.   

Concept: Formal Modification

Reference: J.J. Winckelmann quote in the introduction: "The paint-brush that the artist handles, should be dripped into knowledge".

Connection: The text states that by using simple geometric patterns, one can proceed via stepwise transformations altering parameters like dimension, proportion, and number of elements. This will be the basis of my iterative development in the coming weeks.

## Algorithmic Thinking
The main system I started developing this week is the concept of a Constraint-Based Generator as explored in the "Draw then Code" exercise.   

### System: Basic Tree Generator (Tree 6)

```js
// Define fixed parameters (The trunk and base shape)
SET size = 100
SET position_x = canvas.center_x
SET position_y = canvas.center_y

// Draw the main geometric form (The Conifer shape)
DRAW TRIANGLE (position_x, position_y + size/2) to (position_x - size/2, position_y - size/2) to (position_x + size/2, position_y - size/2)
// Draw the central line (The trunk/main division)
DRAW LINE from (position_x, position_y - size/2) to (position_x, position_y + size/2)

// Logic for the leaves/branches (The key generative element for the next step)
// For now, this is manual lines. Next week, this will become a LOOP.

// IF (line_count < max_lines) THEN
//   DRAW LINE from point on central line to point on triangle edge
```
Constraints (Fixed): The overall bounding box shape is a triangle. The central line is fixed. Parameters (Variables for future exploration): The number of horizontal lines/branches, the spacing between them, and their angle relative to the central line.   

## Critical Reflection
What worked? The analog exercises were surprisingly effective at highlighting the different effects of local vs. global rules. The "Beach" exercise showed self-organization leading to order, while the "Wall Drawing 118" showed unconstrained connection leading to chaos. The contrast helps solidify the need for intentional constraints in generative work.   


What didn't work? My initial hand-sketches for the Sprouts game were very difficult to track, and I broke the "no lines crossing" rule several times. This highlights the lecture's point: "But human beings are very bad automatons. They are slow and horribly subjective". It confirms the necessity of using the computer for perfect execution of complex, rule-based systems.   


Next steps:    

Code the Wall Drawing 118 exercise in p5.js to translate the analog chaos into a digital output.

Begin exploring Iteration + Randomness by coding the grid system discussed in the lectures.

Develop a limited color palette to apply to the grid, as the simple black-and-white feels too basic.

