# day03: Abstract Time Visualization - Cyclical Rings

The project this week was to design an abstract, cyclical visualization of the passing of time, avoiding letters and digits. My approach uses nested, pulsating rings to represent seconds, minutes, and hours, embodying the concept of cyclical time.

## 1. Exploration & Experimentation
The core of the experiment was to treat time not as a number but as a visual cycle expressed through rotation, color, and pulse. I used p5.js and implemented three nested rings: one for hours, one for minutes, and one for seconds.

Continuous Flow: The critical success was using a normalized time parameter (a float from $0$ to $<1$) derived from the current system time. This value, instead of just the whole numbers, allows the rotation and color to transition smoothly, embodying continuous rather than discrete time, which fulfills the "abstract" requirement.

Time as Pulse (Psychological Time): I used the sine wave function (sin(frameCount * rate)) to introduce a subtle, constant pulse to the diameter of each ring. This visually represents the subjective feeling that time moves differently based on its scale:

Seconds: Fastest pulse (* 2.0), giving the ring a fleeting, restless quality.

Hours: Slowest pulse (* 0.1), giving the ring visual permanence and stability.

Visual Indicator: Since traditional hands were forbidden, I implemented the current time as a small, thicker arc that rotates with its respective ring system. The entire ring rotates, so the indicator arc stays visually anchored at the top, pointing to the end of its current cycle.

![Abstract Cyclical Clock Sketch showing nested rings](C:\GENCG\lesson3.png)


### Technical Challenge Encountered: 
My first attempt at calculating the hour cycle was too simplistic (hour() / 12), which resulted in a jumpy, non-continuous motion. I fixed this by including the current minute and second values in the normalized calculation for the hour (see snippet below).

// Snippet for accurate, continuous hour normalization:
let h = hour() % 12; // Base 12-hour cycle
// Normalized value (0 to <1) over 12 hours
let h_normalized = (h * 60 * 60 + minute() * 60 + second()) / (12 * 3600); 

// Diameter is modulated by a slow sine wave for the "pulse"
let hourDiameter = ringDiameter + sin(frameCount * 0.1) * 10;

## 2. Influences & References:

The design is deeply influenced by the lecture's conceptual framework, particularly the contrast between time models and the artistic examples.

Concept - Cyclical Time Nesting: The layered, concentric structure directly embodies the lecture's diagram showing smaller cycles nested within larger ones (seconds within minutes within hours). This provides a visual map of time's structure.

Artistic Influence - Materializing Time: The idea of using a continuous, non-numerical transformation to display time was inspired by the works of Albin Karlsson's evolving sculpture and Susanna Hertrich's Chrono Shredder. These pieces show time as a material process (wax accumulation, paper destruction). My code translates this into a purely visual process (color blending and geometric pulsation).

Generative Art Practice: The methodology of using constrained parameters (normalized time, fixed color palettes) to generate continuous variation is rooted in the thinking of Vera Molnár, focusing on simple algorithmic rules to produce complex, dynamic visual output.

## 3. Algorithmic Thinking

My system operates as a three-tiered, non-interacting modular clock. Each ring has its own independent algorithm for drawing and movement.

Core System Rule: drawTimeRing(diameter, t_norm, color, segments, weight)

Control Parameters:

t_norm: The single normalized value that controls the entire state of that ring.

weight: Line thickness, used to give visual weight to slower cycles (e.g., hours are 4px, seconds are 1px).

segments: The number of discrete marks or "ticks" drawn (e.g., 60 for minutes, 12 for hours).

Progression Rule (Rotation & Color):

Rotation: The entire ring's local coordinate system is rotated by $t\_norm \times 360^\circ$.

Color: The stroke color is determined by a continuous function: lerpColor(ColorA, ColorB, t_norm). As $t\_norm$ moves from $0$ to $1$, the ring's color shifts smoothly (e.g., from deep blue at the start of the cycle to bright cyan at the end).

## 4. Critical Reflection

What Worked: The visualization successfully meets the brief, particularly in its abstract, cyclical nature. The use of lerpColor() is the most effective element, as it makes the passage of time immediately visible through color change, which requires no interpretation of numbers. The fast central pulse provides a great anchor for the ephemeral "Now".

Artistic Decision: The color palette (deep, cool colors for hours; bright, hot colors for seconds) was chosen to visually reinforce the difference in scale and speed, giving the hours a sense of gravity and the seconds a sense of energy.

What Didn't Work / Next Steps: The visualization is currently too continuous. Time, in reality, has discrete "events" (like midnight, or a new hour) that feel like a rupture. The current math creates a perfectly smooth transition from $11:59:59$ to $12:00:00$, which lacks drama.

Questions for Next Week: How can I use the modulus operator (%) or conditional logic (if statements) to trigger a visual shockwave or noise burst across the rings only when a full cycle completes? This would make the discrete nature of time more apparent. Also, how can I introduce an even slower cycle (daily or weekly) into the background color to visualize a layer of "geological" or "historical" time?