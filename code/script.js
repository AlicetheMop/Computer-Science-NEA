/* Written by Samuel Orchard,on the 3rd July 2024
this is the main script for the game, it contains all the code for the game initialisation for the player and enemies, as well as the game loop
*/
let started = false

function setup() {
  createCanvas(700, 700); // create a canvas to draw the level on
  player = new Player(); //initiaties a new player object
  enemy = new Enemy();
  agEn = new aggroEnemy();
}


function draw() {
  if(!started) {
    textSize(32);
    background(100,100,100);
    textAlign(CENTER);
    textFont('Comic Sans');
    text("Press B to start", 350, 100);
    // Check for the 'B' key press to start the game
    if (keyIsDown(66)) { // 66 is the ASCII code for 'B'
      started = true;
    }
    return; // Exit the draw function to prevent further drawing
  }
  background(100, 100, 100); // set the background to grey
  rectMode(CENTER);
  player.draw(); //draws the player
  enemy.draw(); //draws the enemy
  agEn.draw(); //draws the aggro enemy
  player.applyGravity();//applies gravity to the player
  enemy.applyGravity();//applies gravity to the enemy
  agEn.applyGravity();//applies gravity to the aggro enemy
  player.move();// allows the player to move
  enemy.move();// allows the enemy to move
  agEn.move();// allows the aggro enemy to move

}