var studentArray = ["Anna, Jasmine"];

var studentHobby = ["reading", "social media"];

var myStudentObject = new Object();

var studentObjectifier = function(a,b) {
	for (var i = 0; i < a.length; i++) {
		myStudentObject.a[i] = b[i];
	};

}

studentObjectifier(studentArray, studentHobby);

console.log(studentObject);