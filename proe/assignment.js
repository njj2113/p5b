class Assignment {
  constructor(x, y, r, red, green, blue) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  clicked(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.r) {
      this.red = random(0,255);
      this.green = random(0,255);
      this.blue = random(0,255);
    }
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.red, this.green, this.blue)
    ellipse(this.x,this.y,this.r);
  }

  move() {
    this.x += random(-5,5);
    this.y += random(-5,5);
  }
}
