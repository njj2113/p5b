//let assignmentTags = [];
let assignments = [];

//used color converter directly from: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex); //google regular expressions
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function setup() {
  createCanvas(800,600);

  //assignments[0] = new Assignment(200,200,200,0,0,0);
  //assignments[1] = new Assignment(200,200,200,255,255,255);
  //let a = new Assignment(mouseX,mouseY,20,0,0,0);
  //assignments.push(a);
}

//mouseDragged() alternative
function mouseClicked() {

  for (let i = assignments.length-1; i >= 0; i--) {
    if (assignments[i].contains(mouseX, mouseY)) {

      let tempName = assignments[i].name;

      var db = firebase.firestore();
      //assignments = [];

      db.collection("assignments").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          if (tempName == doc.data().title) {
            db.collection("assignments").doc(doc.id).delete();
            for (let j = 0; j < 999; j++) {
              console.log(j);
            }
          }
        });
      });


      for (let i = assignments.length-1; i >= 0; i--) {
        let exist = false;

        db.collection("assignments").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {

            if (tempName == doc.data().title) {
              exist = true;
            }

          });
        });

        if (!exist) {
          assignments.splice(i,1);
        }
      }
    }
  }
}

function draw() {
  //assignmentTags = selectAll('assignment');  //assignments elements are here! but doesn't this reference riot not firebase?

  var db = firebase.firestore();
  //assignments = [];
  db.collection("assignments").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      //assignments.push(doc.data());
      //console.log(doc.id)
      //console.log(doc.data().course);
      //console.log(doc.data().title);

      tempTitle = doc.data().title;

      //console.log(tempTitle);
      let x = random(width);
      let red = hexToRgb(doc.data().color).r;
      let blue = hexToRgb(doc.data().color).g;
      let green = hexToRgb(doc.data().color).b;

      let temp = new Assignment(tempTitle, x, 200, 200, red, blue, green);

      let already = false;
      for (check of assignments) {
        if (tempTitle == check.name){
          already = true;
        }
      }
      if (!already){
        assignments.push(temp);
      }
      //console.log(assignments);
    });
  });

  background(200,100,240);

  for (a of assignments) {
    a.show();
    a.move();
    a.reveal();

    for (other of assignments) {
      if (a != other && a.intersects(other)) {
        a.vx *= -1;
        a.vy *= -1;
        other.vx *= -1;
        other.vy *= -1;
      }
    }
  }
}
