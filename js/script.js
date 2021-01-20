// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions
//width="900" height="600" canvas size

function playerObject(name, img) {
    this.name = name;
    this.img = img;
    this.x = 0;
    this.y = 0;

	
}

function truckObject(name, img,x,y) {
    this.name = name;
    this.img = img;
    this.x = x;
    this.y = y;
	
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var playerSprite = new Image();
playerSprite.src = "./img/1to6.png"; // Frames 1 to 6
var player = new playerObject("Player", playerSprite);

// Gameobjects is a collection of the Actors within the game
var truckSprite = new Image();
truckSprite.src = "./img/truck.png"; // Frames 1 to 6
var redTruckObject =  new truckObject("NPC", truckSprite,625,325);
var truckObjects = [redTruckObject];

//var truckObject = [NPC, new playerObject("NPC", truckSprite)];

// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// Setup image
// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;



// Sprite
//var sprite = new Image();
//sprite.src = "./img/1to6.png"; // Frames 1 to 6

// X axis to Draw from


// Initial time set
var initial = new Date().getTime();
var current; // current time

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("gamertag");
console.log(c);
alert(c);

// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
                gamerInput = new GamerInput("Left");
				player.x -= 25;
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
				player.y -= 25;
				
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
				player.x += 25;
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
				player.y += 25;
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    // console.log("Gamer Input :" + gamerInput.action);
}

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
	  for (i = 0; i < truckObjects.length; i++) {
			truckObjects[i].x--;
			if (truckObjects[i].x < 0)
			{
			  
				truckObjects[i].x = 625;
			}
					
        }
   
}

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
	context.clearRect(0, 0, canvas.width, canvas.height);


	  for (i = 0; i < truckObjects.length; i++) {
			context.drawImage(truckObjects[i].img, 0 , 0, 275, 140, truckObjects[i].x, truckObjects[i].y, 275, 140);
					
        }
    
	animate();
}



function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    } 

    // Draw sprite frame
	
    context.drawImage(player.img, (player.img.width / 6) * currentFrame, 0, 100, 100, player.x, player.y, 100, 100);
	

}

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
