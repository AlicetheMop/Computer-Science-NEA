/* 
Written by Samuel Orchard, on the 3rd - 5th July 2024
this code is for the player object, it contains all the code for the player initialisation, movement and collision detection with the floor and walls
*/
class Player {
  constructor() { //initiates all the variables for the player class
    this.pos = createVector((width-1)*Math.random()+1, (height-1)*Math.random()+1); //the position vector of the player
    this.vel = createVector(0, 0); //the velocity vector of the player
    this.accel = createVector(0, 0); //the acclleration vector of the player 
    this.health = 100; //the health of the player
    this.falling = true; 
    this.canJump = true;
    this.justJumped = false;
    this.justDashed = false;
    this.pos.x = constrain(this.pos.x, 10, width - 10); //restricts the position of the player to on the screen 
    this.pos.y = constrain(this.pos.y, 10, height - 10);
    this.dashCooldown = 90; //cooldown timer for the dash
    this.dashTimeRemaining = 0; //Timer for dash ability

  }

  draw() { //draws the player
    fill("white")
    rect(this.pos.x, this.pos.y, 20, 20);
    if (!this.justDashed){
      fill("green")
      rect(this.pos.x - 5, this.pos.y + 5, 2,2);
    }
    
    if (this.justDashed = true){  //cooldown for the dash
      this.dashTimeRemaining--
      if (this.dashTimeRemaining <= 0){
        this.justDashed = false
      } 
    }
  }

jump() { //lets the player jump
  if (!this.falling) { 
    this.canJump = true;
    this.pos.y--;
    this.vel.y = -20;
    this.falling = true; 
  }else if(this.canJump && this.falling){ //lets the player jump whilst in the air
    this.pos.y--;
    this.vel.y = -20;
    this.falling = true;
    this.canJump = false;
  }
}

dash() { //lets the player dash
  if (!this.justDashed)
    this.vel.x *= 20 //multiplies the velocity by 20 to dash
    this.justDashed = true;
    this.dashTimeRemaining = this.dashCooldown;
}

stopFalling() { //stops the player from falling through the floor
  this.falling = false;
  this.accel.y = 0;
  this.vel.y = 0;
  this.pos.y = height
  this.canJump = true;
}
applyGravity() { //applies gravity to the player 
  if (this.falling && this.pos.y >= height) {
    this.stopFalling();
  }

  if (this.falling) { //accellerates the player under gravity 
    this.accel.y = 1;
  }
}

move() { //allows the player to move using the WASD keys and the spacebar

  /* 
  These keycodes represent the following keys:
  W = 87
  A = 65
  S = 83
  D = 68
  P = 80
  Spacebar = 32
  */
  
  if (keyIsDown(65)) {
    this.vel.x = -4; //player has a velocity left 
  }
  if (keyIsDown(68)) {
    this.vel.x = 4; //player has a velocity right
  }
  if (keyIsDown(80)) {
    this.dash()
    console.log("dash")
  }

  if ((keyIsDown(87) || keyIsDown(32))) {
    if (!this.justJumped) {
      this.jump();
      this.justJumped = true;
    }
  } else {
    this.justJumped = false;

  }

  if (keyIsDown(83)) {
    this.vel.y = 1;
  }

  if (!keyIsDown(65) && !keyIsDown(68)) {
    this.vel.x = 0;
  }

  if (this.pos.x > width - 20){ //stops the player from going off the screen
    this.pos.x = width - 20;
  }
  if (this.pos.x < 20){
    this.pos.x = 20;
  }

  this.vel.add(this.accel);
  this.pos.add(this.vel);

  if (this.pos.y > height - 20) {
    this.stopFalling();
    this.pos.y = height - 20;
    this.jumpCount = 0;
  }else{
    this.applyGravity();
  }
}
}