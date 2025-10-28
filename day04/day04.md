# day04

## Drawing Machines

### Exploration & Experimentation

This week's focus was building the Stubborn Interpreter, a machine designed to deliberately misunderstand continuous human input by quantizing it into discrete, geometric marks. I used p5.js for the implementation.

Initial Code Experiments: My first attempt used a continuous line, which defeated the purpose of a "discrete" machine. I quickly switched to tracking "energy" in a hidden grid array.

Parameters Tested:

gridSize (Resolution): Tested ranges from gridSize = 20 (high resolution, noisy) to gridSize = 80 (low resolution, very abstract).

threshold (Stubbornness): Tested threshold = 3 (too sensitive) up to threshold = 20 (requires long interaction). I settled on 10 for the base concept.

gridEnergy *= 0.99 (Memory Fade): The decay rate was crucial. Too fast, and no mark could persist; too slow, and the entire canvas would fill instantly. The 0.99 decay rate provides a gentle "short-term memory" that allows blocks to fade slightly after input stops.

Technical Challenges: Getting the index mapping right for the 2D grid was tricky (index = col + row * gridCols). I had one failed attempt where the colors were all shifted horizontally until I corrected the indexing logic.

### Influences & References

Artists and Artworks:

Piet Mondrian's Composition with Large Red Plane, Yellow, Black, Gray, and Blue (1921) provided the aesthetic constraint. The machine's rule-bound output—black, red, and yellow/orange rectangles—directly references his Neo-Plasticism, imposing order on chaos.

Sloppy Forgeries (referenced in the lecture slides) inspired the idea of copying or interpreting a style. My machine is an "interpreter" that reduces any input to a geometric style.

Concepts: The core concept is inspired by Vera Molnár's "machine imaginaire" and the idea of systems with built-in constraints. The machine's constraint (the grid and the threshold) is what defines its unique artistic voice, rather than its technical ability to draw accurately.

### Algorithmic Thinking

Rules and Systems (The Logic of the Stubborn Interpreter):The machine's primary rule is that Input $\neq$ Output.Input Mapping: The raw mouse coordinates are converted to a discrete grid index $(x, y) \rightarrow (\text{col}, \text{row})$.Energy Accumulation: When the mouse is pressed in a cell, the cell's gridEnergy value increases by $1$.Decay/Constraint: In every frame, $1\%$ of the gridEnergy is lost (fading memory).Conditional Mark-Making: A block is only drawn IF $\text{gridEnergy} > \text{threshold}$. The opacity of the block is determined by how far the energy is above the threshold (allowing blocks that are heavily "charged" to be more solid).Color Rule: The color of the mark is determined by the column index (col % 3), forcing the machine's aesthetic to be structural and systematic.

```js
Function draw():
    // 1. Decay (Constraint)
    FOR EACH cell IN grid:
        cell.energy = cell.energy * 0.99

    // 2. Accumulate (Input)
    IF mouseIsPressed:
        col = quantize(mouseX / gridSize)
        row = quantize(mouseY / gridSize)
        grid[col][row].energy += 1

    // 3. Draw (Output)
    FOR EACH cell IN grid:
        IF cell.energy > threshold:
            color = determineColor(cell.col % 3)
            opacity = map(cell.energy)
            drawRect(cell.x, cell.y, color, opacity)
```

### Critical Reflection

What worked? What surprised you? The core system of energy accumulation and decay worked perfectly, creating a dynamic surface where marks would "burn in" with persistence and then slowly fade. The biggest surprise was how the semi-transparent background in the final render enhances the feeling of decay, making the piece feel like a living, breathing ledger of interaction rather than a static image.

What didn't work? Why do you think it failed? I initially tried to link color to the energy level, but the result was too messy. It failed because it gave the machine an emotional quality (hotter = more intense color), which conflicted with its established "stubborn and systematic" character. By fixing the color based purely on column position, the result became colder, more systematic, and truer to the machine's persona.

![ExampleImage](gencg_h2501/day04/lesson4_1.png)

