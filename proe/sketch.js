let assignment;

function setup() {
  createCanvas(800,600);
  assignment = new Assignment(200,200,200);
  assignment2 = new Assignment(200,200,200);
}

function draw() {
  background(200,100,240);
  assignment.move();
  assignment.show();
  assignment2.move();
  assignment2.show();
}
