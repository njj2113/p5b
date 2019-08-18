let assignments = [];
//let assignment;

function setup() {
  createCanvas(800,600);
  assignments[0] = new Assignment(200,200,200,0,0,0);
  assignments[1] = new Assignment(200,200,200,255,255,255);
}

//mouseDragged would be even cooler
function mousePressed() {
  //let r = random(10,50);
  //let a = new Assignment(mouseX,mouseY,r,0,0,0);
  //assignments.push(a);

  for (let i = assignments.length-1; i >= 0; i--) {
    assignments[i].clicked(mouseX, mouseY);
  }
}

function draw() {
background(200,100,240);
//for (let i = 0; i < assignments.length; i++)
//{
//  assignments[i].move();
//  assignments[i].show();
//}

for (let assignment of assignments) {
  assignment.move();
  assignment.show();
}

}
