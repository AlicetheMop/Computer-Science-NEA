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
    //making a button to start the game 
    if(mouseX > width/2 - 125 && mouseX < width/2 + 125 && mouseY > height/2 - 35 && mouseY < height/2 + 15){
      textAlign(CENTER);
      fill("white")
      rect(width/2 - 125, height/2 - 35, 250, 50, 20);
      fill("black")
      textFont('Comic Sans');
      text("click to start", width/2, height/2);
      if(mouseIsPressed){
        started = true;
      }
    }else{
      textAlign(CENTER);
      fill("black")
      rect(width/2 - 125, height/2 - 35, 250, 50, 20);
      fill("white")
      textFont('Comic Sans');
      text("click to start", width/2, height/2);
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