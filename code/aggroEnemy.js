/*
Written by Samuel Orchard, on the 5th July 2024
This code is for the aggroEnemy object, it contains all the code for the aggroEnemy initialisation, movement and collision with the floor and walls 
*/
class aggroEnemy {
  constructor(pSpeed){ //initiates all the variables for the enemy class
    this.pos = createVector((width-1)*Math.random()+1, (height-1)*Math.random()+1);
    this.vel = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.health = 100;
    this.falling = true;
    this.speed = pSpeed;
    this.hitboxRadius = 12.5
  }

  draw(){ //draws the aggressive enemy
    fill("blue")
    rect(this.pos.x, this.pos.y, 25, 25)
  }

  jump() { //lets the enemy jump 
  if (!this.falling) { 
    this.pos.y--;
    this.vel.y = -15;
    this.falling = true; 
    }
  }

  stopFalling() { //stops the enemy from falling through the floor
    this.falling = false;
    this.accel.y = 0;
    this.vel.y = 0;
    this.pos.y = height
  }

  applyGravity() { //applies gravity to the enemy 
    if (this.falling && this.pos.y >= height) {
      this.stopFalling();
    }

    if (this.falling) { //accellerates the enemy under gravity 
      this.accel.y = 1;
    }
  }

  move() { //the enemy moves towards the player
    if (player.pos.y < this.pos.y) {
      this.jump();
    }
    if (player.pos.x < this.pos.x) {
      this.vel.x = -this.speed;
    }
    if (player.pos.x > this.pos.x) {
      this.vel.x = this.speed;
    }
    if (this.pos.x > width - 30) { //prevents the enemy from going off the screen
      this.vel.x = -2;
    }
    if (this.pos.x < 30) {
      this.vel.x = 2;
    }

    this.vel.add(this.accel);
    this.pos.add(this.vel);

    if (this.pos.y > height - 20) {
      this.stopFalling();
      this.pos.y = height - 20;
    }else{
      this.applyGravity();
    }
  }
}