let assignment;
var assignments = [];

function setup() {
  createCanvas(800,600);
  assignments.push(new Assignment);
  print(assignments.length);
}

function draw() {
  background(200,100,240);
  assignment.move();
  assignment.show();
}

class Assignment {
  constructor() {
    this.x = 200;
    this.y = 200;
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
