
// Oeanic Night - Creative Coding Final Module Project
//---------------------------------//
// Note: Play this code on Chrome to hear audio. If it doesn't play, refresh the page. 



// Variables for gradient background
let topcolor, bottomcolor;

// Variables for waves/ocean
let yoff = 0.0; // 2nd dimension of perlin noise

//Array for Stars
let stars = []

//Array for Comet
let mousePositions = [];

// Variables for Audio
var WavesSound;
var Instrumental;


function preload(){

    WavesSound = loadSound('Assets/Ocean Waves with Bird-song and Gull.mp3');
    Instrumental = loadSound ('Assets/In the Rain - MLB.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  WavesSound.play();
  WavesSound.loop();
  
  Instrumental.play();
  Instrumental.loop();

    
//////////////// Stars ///////////////////////
  
//Loop through however many stars you want
	for (i = 0; i < 300; i++){
		
		// Create a new 'star' object, to store an X and Y value.
		// Assign each X and Y value a random number within the bounds of the sketch. 
		let star = {
			x:random(0,width),
			y:random(0,height)
		};
		
		// Add this 'star' to the array from before.
		stars.push(star);		
	}
  
///////////////// Comet //////////////////////
  
  for (let i = 0; i < mousePositions.length ; i+=1) {
    
  }
  
}

function draw() {
  
/////////// Gradient Background /////////////

  topcolor = color (2, 0, 20); // the top color
  bottomcolor = color (127, 107, 176); // the bottom color
  
  // draw background color gradient only once in setup function 
  
  // make a 'for' loop for every line of canvas height
  for(let y=0; y < height; y++) {
    
    n = map(y, 100, height, 0, 0.80);
    
    // the 100 parameter means that the top color will start to fade into the the bottom color at that position. Changing that value will make it so the top color will fade into the bottom one at a different height. 
    
    // the 0.80 parameter changes the height from which the top color really fades into the bottom one (i.e the bottom color will become more prominent).
    
    
    let newcolor = lerpColor(topcolor, bottomcolor, n);
    stroke (newcolor); // new color put on brush
    line (0,y,width, y); // draw a horizontal line
    
    // lerpColor blends 2 colors to make a color in between them
  }
  
///////////////// Stars //////////////////////

  // Beginning of stars loops
	// Loop through all the stars in the array
	for (i = 0; i < 200; i++){
		
		// Define local variables based on the X and Y values of *this* star.
		
		let x = stars[i].x;
		let y = stars[i].y;
		
		// Colour of stars
		fill('white');
		
		// Draw an ellipse with this particular star's X and Y value to create the stars.
		
	ellipse(x,y,random (1,3),random (1,3));
      // The third parameter (first random function) is responsible for the horizontal length of the stars. 
      // The fourth parameter is responsible for the vertical length of the stars. 
      // Adding a random fucntion for those parameters gives the stars a 'glittering' effect.
      
      // End of stars loop
    }

///////////////// Moon ///////////////////////
  
   drawingContext.shadowBlur = 60;
  drawingContext.shadowColor = color(252, 252, 252);
  // For glow effect for the moon
  
  fill ("white");
 ellipse(100, 100, 120, 120);
 
   drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = 0;
  // To make sure the other elements in the canvas don't get the glow effect; just the moon does
  
  
/////////////// Comet Trail //////////////////
  
  stroke ("rgb(218,230,245)");
  // Color of the trail

  mousePositions.push({x: mouseX, y: mouseY});
  for (let i = 0; i < mousePositions.length - 3; i +=1) {
    // The '-3' value controls the distance between the cursor and the trail when the cursor moves. A lower value like '-7' will make the distance between the cursor and trail higher; likewise, a higher value like '-2' will make the distance lower. 
    // This value also affects the length of the trail along with the distance
    
    
    let x = mousePositions[i].x;
    let y = mousePositions[i].y;
    let xNext = mousePositions[i+1].x;
    let yNext = mousePositions[i+1].y;
    line(x, y, xNext, yNext);
    
    // Ask Lana (or someone) what this part of the code means
    
    strokeWeight (4.5)
    // Width of the trail

  }
  
  if (mousePositions.length > 10) {
    // This statement controls the length of the trail. The higher the value of the '10' parameter, the longer the trail. The lower the value, the shorter the trail. 
    
    mousePositions.shift();
    //This function makes it so that the line following the cursor disappears after a certain time
  }
  strokeWeight (1.5)
  // Another strokeWeight function in the end to make sure that the other shapes (stars, in particular) aren't the same stroke as the trail
    
////////////////// Comet /////////////////////

    fill ("rgb(218,230,245)")
    ellipse (mouseX, mouseY, 20, 20)
    
/////////////// Ocean Waves //////////////////
 
  ///----- Wave #1 -----/// 
  
  fill(21, 40, 89, 100);
  noStroke ();
  
  // We need to draw a polygon out of the wave points
  beginShape();

  let xoff = 0; // 2D Noise

  for (let x = 0; x <= width; x += 10) {
    
    // the 'x=0' parameter refers to the starting point of the shape of the waves (from the left, where x = 0)
    // 'x <= width' refers to the point where the waves are supposed to stop.
    // 'x += 10' controls the distance between each wave. A smaller value will make the waves closer together; a bigger value will make the waves more far apart. 
    
    
    let y = map(noise(xoff, yoff), 0, 1, 580, 700);
    
    // the '580' controls the height of the waves (lower values mean higher waves; higher values mean shorter waves)
    // the '700' refers to the position (height) at which the 'shape' of the ocean/waves appear (lower values mean that the ocean will be higher on the canvas; higher values mean that the ocean will be lower on the canvas)
    
    
    
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.04;
    
    // the 'xoff += 0.05' statement refers to the smoothness of the surface of the wave. Higher values will make the surface sharper, like a mountain. Lower values will make it smoother and their peak lower.
  }
  
  
  // increase y dimension for noise
  yoff += 0.005;
  
  // the 'yoff' statement refers to the speed at which the waves flow/move. The higher the value, the faster the waves will move. The lower the value, the slower the waves will move.
  
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  
  ///----- Wave #2 -----///
  
  fill(24, 44, 97, 120);
  
  beginShape();
  
  let xoff2 = 0; // 2D Noise
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 580, 720);
    vertex(x, y);
    xoff += 0.04;
  }
  
  yoff += 0.005;
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  
  ///----- Wave #3 -----///
  
  fill(17, 37, 89, 150);
  
  beginShape();
  
  let xoff3 = 0; // 2D Noise
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 590, 740);
    vertex(x, y);
    xoff += 0.04;
  }
  
  yoff += 0.005;
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
  
  ///----- Wave #4 -----///
  
  fill(17, 35, 82, 230);
  
  
  beginShape();
  
  let xoff4 = 0; // 2D Noise
  for (let x = 0; x <= width; x += 10) {
    let y = map(noise(xoff, yoff), 0, 1, 600, 760);
    vertex(x, y);
    xoff += 0.04;
  }
  
  yoff += 0.005;
  
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  
  

}