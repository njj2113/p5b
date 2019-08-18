let assignmentTags = [];
let assignments = [];
let run = false;

function setup() {
  createCanvas(800,600);

  //var assignmentsRef = firebase.firestore().collection('assignments');
  //console.log(assignmentsRef.length);

  //for (let i = 0; i < 10; i++) {
  //  let x = random(width);
  //  let y = random(height);
  //  let r = random(10,50);
  //  assignments[i] = new Assignment(x, y, r);
  //}

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
          }

        });
      });

      assignments.splice(i,1);
    }
  }
}

function draw() {
























  //assignmentTags = selectAll('assignment');  //assignments elements are here! but doesn't this reference riot not firebase?
  //var assignmentTags = firebase.database().ref("assignment"); //no


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
        let temp = new Assignment(tempTitle, x, 200, 200);

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

  console.log(assignments);















  //if (!run){
  //  console.log(assignments);
  //  run = true;
  //}

  //for (thing of assignments) {
  //  console.log(thing);
  //}



  //var db = firebase.firestore();
  //var assignmentsRef = db.collection('assignments');

  //for (assignment of assignmentsRef) {
  //  console.log(assignment);
  //}




  //var docRef = db.collection("assignments").doc("SF");

  //docRef.get().then(function(doc) {
  //  if (doc.exists) {
  //      console.log("Document data:", doc.data());
  //  } else {
  //      // doc.data() will be undefined in this case
  //      console.log("No such document!");
  //  }
  //}).catch(function(error) {
  //  console.log("Error getting document:", error);
  //});




  //var assignmentTags = firebase.firestore().collection('assignments');
  //console.log(assignmentTags.length);
  //assignments = [];
  //for (assignment of assignmentTags)
  //{
  //  let x = random(width);
  //  assignment = new Assignment(assignment.title, x, 200, 200);
  //  assignments.push(assignment);
  //}





























  background(200,100,240);
  //for (let i = 0; i < assignments.length; i++) {
    //if (assignments[i].contains(mouseX, mouseY)) {
    //  assignments[i].changeColor();
    //}
    //assignments[i].move();
    //assignments[i].show();
  //}

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

  //if (assignments.length > 10) {
  //  assignments.splice(0,1);
  //}
}
