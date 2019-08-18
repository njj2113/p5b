let assignments = [];
//let assignment;

let a1;
let a2;

function setup() {
  createCanvas(800,600);

  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10,50);
    assignments[i] = new Assignment(x, y, r, 200, 200, 200);
  }

  assignments[0] = new Assignment(200,200,200,0,0,0);
  assignments[1] = new Assignment(200,200,200,255,255,255);
  let r = random(10,50);
  let a = new Assignment(mouseX,mouseY,r,0,0,0);
  assignments.push(a);

}

//mouseDragged() alternative
function mouseClicked() {

  for (let i = assignments.length-1; i >= 0; i--) {
    if (assignments[i].contains(mouseX, mouseY)) {
      assignments.splice(i,1);
    }
  }
}

function draw() {
  background(200,100,240);
  for (let i = 0; i < assignments.length; i++) {
    if (assignments[i].contains(mouseX, mouseY)) {
      assignments[i].changeColor();
    }
    assignments[i].move();
    assignments[i].show();
  }

  //if (a1.intersects(a2)) {
  //  background(200,0,100);
  //}

  for (let i = 0; i < assignments.length; i++) {
    assignments[i].show();
    assignments[i].move();
  }

  //for (let assignment of assignments) {
  //  assignment.move();
  //  assignment.show();
  //}

  //if (assignments.length > 10) {
  //  assignments.splice(0,1);
  //}
}
