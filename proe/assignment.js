class Assignment {
  constructor(x, y, r = 50, red = 100, green = 100, blue = 100, vx = 3, vy = 3) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.vx = vx;
    this.vy = vy;
  }

  intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.r + other.r;
  }

  changeColor() {
    this.red = random(0,255);
    this.green = random(0,255);
    this.blue = random(0,255);
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return (d < this.r);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.red, this.green, this.blue)
    ellipse(this.x,this.y,this.r);
  }

  move() {
    if (0 > this.x || this.x > width) {
      this.vx *= -1;
    }

    if (0 > this.y || this.y > height) {
      this.vy *= -1;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < -100 || this.x > width + 100){
      this.x = width/2;
    }
    if (this.y < -100 || this.y > height + 100){
      this.y = height/2;
    }
  }
}
