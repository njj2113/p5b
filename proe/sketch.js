let assignment;
//var assignments = [];

function setup() {
  createCanvas(800,600);
  assignment = new Assignment(200,200,200));
  //print(assignments.length);
}

function draw() {
  background(200,100,240);
  assignment.move();
  assignment.show();
}

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
    ellipse(assignment.x,assignment.y,50,50);
  }

  move() {
    assignment.x += random(-5,5);
    assignment.y += random(-5,5);
  }
}
