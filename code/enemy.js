/*
Written by Samuel Orchard, on the 3rd - 5th July 2024
this code is for the enemy object, it contains all the code for the enemy initialisation, movement and collision detection with the floor and walls
*/

//new thing
class Enemy {
  constructor() { //initiates all the variables for the enemy class
    this.pos = createVector((width - 1) * Math.random() + 1, (height - 1) * Math.random() + 1);
    this.vel = createVector(0, 0);
    this.accel = createVector(0, 0);
    this.health = 100;
    this.falling = true;
  }

  draw() { //draws the enemy
    fill("red")
    rect(this.pos.x, this.pos.y, 30, 30)
  }

  jump() { //lets the enemy jump
    if (!this.falling) { 
      this.pos.y--;
      this.vel.y = -20;
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
    let jumpNum = Math.random() * 1000; //randomises the enemy's jumps
    let moveNum = Math.random() * 100; //randomises the enemy's right movement

    if (jumpNum > 990) {
      this.jump();
    }
    if (moveNum < 5) {
      this.vel.x = -4;
    }
    if (moveNum >= 95) {
      this.vel.x = 4;
    }
    if (this.pos.x > width - 30) { //prevents the enemy from going off the screen
      this.pos.x = width - 30;
    }
    if (this.pos.x < 30) {
      this.pos.x = 30;
    }

    this.vel.add(this.accel);
    this.pos.add(this.vel);

    if (this.pos.y > height - 20) {
      this.stopFalling();
      this.pos.y = height - 20;
    } else {
      this.applyGravity();
    }
  }
}