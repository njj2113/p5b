var circleY;
var circleX = 50;
var col = 0;
let a = 5;

function setup() {
  // put setup code here
  createCanvas(800,600);
  print("Presto");
  circleY = 50;
  background(220,0,100);
}

function draw() {
  // put drawing code here
  col = map(mouseX,0,800,255,0);
  background(col, col, 255-col);
  circleY += 10;
  ellipse(mouseX,circleY,50,50);
  rect(100,100,500,50);

  if (circleY > 600)
  {
    fill(random(0,255),random(0,255),random(0,255));
    circleY = 0;
  }
}

//function mousePressed() {
//  background(220,0,100)
//}
