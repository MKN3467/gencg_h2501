let img;

function preload() {
  // Load the image you just uploaded
  // Make sure the path matches your folder structure!
  img = loadImage('./content/day01/007/portrait.jpg'); 
}

function setup() {
  // Create canvas based on window size
  createCanvas(600, 800);
  
  // Resize image to fit canvas for performance
  img.resize(width, height);
  
  // We stop the loop because pixel sorting is heavy
  // We will run it once to generate the art
  noLoop(); 
}

function draw() {
  background(0);
  
  // Load the pixel data into memory
  img.loadPixels();

  // Loop through every column (x)
  for (let x = 0; x < img.width; x++) {
    
    // We will sort random "chunks" of each column
    // This creates the glitchy, interrupted look
    let y = 0;
    while (y < img.height) {
      // Pick a random length for the drip
      let dripLength = int(random(10, 100));
      
      // Sort that specific chunk of pixels
      sortColumn(x, y, dripLength);
      
      // Move down
      y += dripLength;
    }
  }
  
  // Update the image with the new sorted pixels
  img.updatePixels();
  
  // Draw the result
  image(img, 0, 0);
}

// Custom function to sort a piece of a column by brightness
function sortColumn(x, y, h) {
  // Get all pixels in this vertical strip
  let strip = [];
  
  // Safety check to not go off screen
  let endY = min(y + h, img.height);
  
  for (let i = y; i < endY; i++) {
    let index = (x + i * img.width) * 4;
    let r = img.pixels[index];
    let g = img.pixels[index + 1];
    let b = img.pixels[index + 2];
    let a = img.pixels[index + 3];
    // Calculate brightness
    let bright = (r + g + b) / 3;
    strip.push({ c: [r, g, b, a], b: bright });
  }
  
  // SORT the strip based on brightness (The "Melting" logic)
  // Change 'b - a.b' to 'a.b - b.b' to reverse the melt direction!
  strip.sort((a, b) => b.b - a.b);
  
  // Put the sorted pixels back into the image
  for (let i = 0; i < strip.length; i++) {
    let py = y + i;
    let index = (x + py * img.width) * 4;
    let col = strip[i].c;
    img.pixels[index] = col[0];
    img.pixels[index + 1] = col[1];
    img.pixels[index + 2] = col[2];
    img.pixels[index + 3] = col[3];
  }
}