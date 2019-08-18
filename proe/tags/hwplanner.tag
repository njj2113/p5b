<hwplanner>
  <!-- Enter the course and color you want to use -->
  <p style="margin-bottom: -4px">MENU</p>
  <div id="menu">
    <form>
      <input type="text" ref="courseName" placeholder="Course Name" required="required">
      <select ref="courseColor" required="required">
        <option selected="selected" disabled="disabled" hidden="hidden">Select a color</option>
        <option value="#f5f5f5">White</option>
        <option value="#ed7474">Red</option>
        <option value="#7498ed">Blue</option>
        <option value="#ecfc03">Yellow</option>
        <option value="#c603fc">Purple</option>
        <option value="#fc9003">Orange</option>
        <option value="#41b064">Green</option>
        <option value="#4a3110">Brown</option>
      </select>
      <button type="button" name="confirmSubject" onclick={ addSubject }>Add</button>
    </form>

    <!-- Add assignment -->
    <form if={ courses.length > 0 }>
      <hr>
      <select ref="courseSelect">
        <option each={ item in courses }>{ item.name }</option>
      </select>
      <input type="text" ref="assignmentName" placeholder="Assignment">
      <input type="date" ref="assignmentDate">
      <button type="button" name="confirmAssignment" onclick={ addAssignment }>Add</button>
      <button type="button" name="deleteSubject" onclick={ deleteSubject }>Delete selected course</button>
    </form>

    <!-- Sorting options -->
    <button type="button" name="sortByDate" onclick={ sortByDate } if={ assignments.length > 1}>Sort by due date</button>
    <button type="button" name="sortByClass" onclick={ sortByClass } if={ assignments.length > 1}>Sort by class</button>
  </div>
  <assignment each={ item in assignments }></assignment>
  <style>
    :scope {
      width: 85%;
      height: 100%;
    }
  </style>
  <script>
    this.courses = [];
    this.assignments = [];
    var db = firebase.firestore();
    var coursesRef = db.collection('courses');
    var assignmentsRef = db.collection('assignments');
    var that = this;

    coursesRef.onSnapshot(function(snapshot){
      var courses = [];
      snapshot.forEach(function(doc){
        courses.push(doc.data());
      })
      that.courses = courses;
      that.update();
    })

    assignmentsRef.onSnapshot(function(snapshot){
      var assignments = [];
      snapshot.forEach(function(doc){
        assignments.push(doc.data());
      })
      that.assignments = assignments;
      that.update();
    })

    this.addSubject = function (event) {
      var newSubject = {
        name: this.refs.courseName.value,
        color: this.refs.courseColor.value
      }
      var subjectRef = coursesRef.doc(newSubject.name);
      subjectRef.set(newSubject);
      this.refs.courseName.value = "";
      this.refs.courseName.focus();
    }

    this.addAssignment = function (event) {
      var newAssignment = {
        course: this.refs.courseSelect.value,
        title: this.refs.assignmentName.value,
        due: this.refs.assignmentDate.value,
        color: undefined,
        done: false,
        id: ""
      }
      for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].name == newAssignment.course) {
          newAssignment.color = this.courses[i].color;
        }
      }
      var newKey = assignmentsRef.doc().id;
      newAssignment.id = newKey;
      assignmentsRef.doc(newKey).set(newAssignment);
      this.refs.assignmentName.value = "";
      this.refs.assignmentName.focus();
    }

    this.sortByDate = function (event) {
      function compare(a, b) {
        const dateA = a.due;
        const dateB = b.due;
        let comparison = 0;
        if (dateA > dateB) {
          comparison = 1;
        } else if (dateA < dateB) {
          comparison = -1;
        }
        return comparison;
      }
      this.assignments.sort(compare);
    }

    this.sortByClass = function (event) {
      function compare(a, b) {
        const classA = a.course;
        const classB = b.course;
        let comparison = 0;
        if (classA > classB) {
          comparison = 1;
        } else if (classA < classB) {
          comparison = -1;
        }
        return comparison;
      }
      this.assignments.sort(compare);
    }

    this.deleteSubject = function (event) {
      var currentSubject = this.refs.courseSelect.value;
      for (var i = 0; i < this.assignments.length; i++) {
        if (this.assignments[i].course == currentSubject) {
          assignmentsRef.doc(this.assignments[i].id).delete().then(function(){
            console.log("Deleted assignment");
          }).catch(function(error){
            console.error("Error removing assignment: ", error);
          });
        }
      }
      coursesRef.doc(currentSubject).delete().then(function(){
        console.log("Deleted subject");
      }).catch(function(error){
        console.error("Error removing subject: ", error);
      });
    }
  </script>
</hwplanner>
