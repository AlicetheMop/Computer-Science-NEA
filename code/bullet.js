class Bullet{
    constructor(startX, startY, newAngle){
      this.size = 10;
      this.speed = 20;
      this.angle = newAngle;
      this.pos = createVector(startX,startY);
      this.vel = createVector(sin(this.angle)*this.speed,cos(this.angle)*this.speed);
      this.hitboxRadius = 5;
      this.damage = 10;
    }
    

    move(){
      this.pos.add(this.vel);
    }
  
    update(){
      this.move();
    }
  
    checkOnScreen(){
      return (this.pos.x < width && this.pos.x > 0 && this.pos.y > 0 && this.pos.y < height)
    }
  
    display(){
      push()
      fill("yellow")
      translate(this.pos.x,this.pos.y);
      rotate(-this.angle+180);
      circle(0, 0,this.size)
      pop()
    }
    
  }