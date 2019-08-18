class Assignment {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x,this.y,50,50);
  }

  move() {
    this.x += random(-5,5);
    this.y += random(-5,5);
  }
}
