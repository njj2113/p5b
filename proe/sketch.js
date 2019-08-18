let assignments = [];

function setup() {
  createCanvas(800,600);

  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10,50);
    assignments[i] = new Assignment(x, y, r, 200, 200, 200);
  }

  //assignments[0] = new Assignment(200,200,200,0,0,0);
  //assignments[1] = new Assignment(200,200,200,255,255,255);
  //let a = new Assignment(mouseX,mouseY,20,0,0,0);
  //assignments.push(a);
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

  for (a of assignments) {
    a.show();
    a.move();

    for (other of assignments) {
      if (a != other && a.intersects(other)) {
        a.vx *= -1;
        a.vy *= -1;
        other.vx *= -1;
        other.vy *= -1;
      }
    }
  }

  //if (assignments.length > 10) {
  //  assignments.splice(0,1);
  //}
}
