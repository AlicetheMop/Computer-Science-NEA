/* Written by Samuel Orchard,on the 3rd July 2024
this is the main script for the game, it contains all the code for the game initialisation for the player and enemies, as well as the game loop
*/
let started = false
let enemies = []
let agEnSpeed = Math.round(Math.random(0, 1) * 10);
let enemyTypes = Math.round(Math.random(0,10) * 10);

function setup() {
  createCanvas(700, 700); // create a canvas to draw the level on
  player = new Player(); //initiaties a new player object
  for (let i = 0; i < ((1 + Math.round(Math.random() * 10))) * (width / 700); i++) {  //spawns a random number of enemies depending on the size of the window
    let agEnSpeed = Math.round(Math.random(0, 1) * 10); //randomly sets the speed of the aggressive enemies
    let enemyTypes = Math.round(Math.random(0,10) * 10); //randomly sets the number of aggressive enemies vs normal enemies 
    while (agEnSpeed >= 3) {  //prevents the agressive enemy being faster than the player
      agEnSpeed -= 1;
    }
    if (enemyTypes > 5){ //adds new enemies
      enemies.push(new Enemy());
    } else { //adds new aggressive enemies 
      enemies.push(new aggroEnemy(agEnSpeed));
    }
  }
}


function draw() {
  if(!started) {
    textSize(32);
    background(100,100,100);
    //making a button to start the game 
    if(mouseX > width/2 - 125 && mouseX < width/2 + 125 && mouseY > height/2 - 35 && mouseY < height/2 + 15){ //checks if the mouse is over the button
      textAlign(CENTER); //if the mouse is hovering over the button the colours invert
      fill("white")
      rect(width/2 - 125, height/2 - 35, 250, 50, 20);
      fill("black")
      textFont('Comic Sans');
      text("click to start", width/2, height/2);
      if(mouseIsPressed){ //checks if the user has clicked the button
        started = true;
      }
    }else{ //if the mouse is over the button draws the button normally 
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
  playerHandle();
  enemyHandle();
}

function playerHandle() {
  player.draw(); //draws the player
  player.applyGravity();//applies gravity to the player
  player.move();// allows the player to move
  player.enemyAttacks(); //checks for enemy attacks
}

function enemyHandle(){
  for(let i in enemies) {
    enemies[i].draw(); //draws the enemies
    enemies[i].applyGravity(); //applies gravity to the enemies
    enemies[i].move(); //allows the enemies to move
  }
}