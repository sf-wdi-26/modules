window.onload = function() {

//helpers

function valueize (x) {
	return x.value;
}

function selectId (id) {
	return document.getElementById(id);
}

// basic calc
var basicCalcBtn = selectId("basic-calc");
var basicAnswerForm = selectId("basic-answer-alert");
var opArray = ["+","-","*","/"];

function calcNums () {
	var basicNum1 = selectId('basic-num-1').value;
	var basicNum2 = selectId('basic-num-2').value;
	var basicOperation = selectId('basic-operation').value;
	console.log(basicNum2);
		// for (var i = 0; i < opArray.length; i++) {

		// 	if (basicOperation == opArray[i]) {
		// 		basicAnswerForm.innerHTML = basicNum1 opArray[i] basicNum2;
		// 	}
		// };
	if (basicOperation == "+") {
		basicAnswerForm.innerHTML = Number(basicNum1) + Number(basicNum2);
	} else if (basicOperation == "-") {
		basicAnswerForm.innerHTML = basicNum1 - basicNum2;
	} else if (basicOperation == "*") {
		basicAnswerForm.innerHTML = basicNum1 * basicNum2;
	} else {
		basicAnswerForm.innerHTML = basicNum1 / basicNum2;
	}
}

basicCalcBtn.addEventListener("click", function() {
	hideAnswers(tripAnswerForm);
	hideAnswers(bmiAnswerForm);
	hideAnswers(loanAnswerForm);
	calcNums();
	showAnswers(basicAnswerForm);
})

// trip
var tripCalcBtn = selectId("trip-calc");
var tripAnswerForm = selectId("trip-answer-alert");

function calcTripCost () {
	var distance = selectId("trip-distance").value;
	var mpg = selectId("trip-mpg").value;
	var cost = selectId("trip-cost").value;
	var speed = selectId("trip-speed").value;

	if (speed < 60){
		tripAnswerForm.innerHTML = "$" + distance / (mpg * cost);
	} else {
		tripAnswerForm.innerHTML = "$" + distance / (mpg - (speed - 60)*2) * cost;
	}
}

tripCalcBtn.addEventListener("click", function () {
	hideAnswers(basicAnswerForm);
	hideAnswers(bmiAnswerForm);
	hideAnswers(loanAnswerForm);
	calcTripCost();
	showAnswers(tripAnswerForm);
})

// BMI
var bmiCalcBtn = selectId("bmi-calc");
var bmiAnswerForm = selectId("bmi-answer-alert");
var bmiUnits = selectId("bmi-units");
var bmiUnitsValue = bmiUnits.value;

var bmiMassUnit = selectId("bmi-mass-unit");
var bmiHeightUnit = selectId("bmi-height-unit");

function changeUnits () {
	if (bmiUnits.value == "imperial" ) {
		bmiMassUnit.innerHTML = "lbs";
		bmiHeightUnit.innerHTML = "inches";
	} else {
		bmiMassUnit.innerHTML = "kg";
		bmiHeightUnit.innerHTML = "m";
	}
}

bmiUnits.addEventListener("change", function(){
	changeUnits();
})

function calcBmi () {
	var mass = selectId("bmi-mass").value;
	var pounds = mass * 2.2;
	var height =  selectId("bmi-height").value;
	var inches = height * 3.2;

	if (bmiUnits.value == "metric") {
		bmiAnswerForm.innerHTML = mass / (height * 2);
	} else {
		bmiAnswerForm.innerHTML = ((pounds / (inches * inches)) * 703);
	}
}

bmiCalcBtn.addEventListener("click", function(){
	hideAnswers(basicAnswerForm);
	hideAnswers(tripAnswerForm);
	hideAnswers(loanAnswerForm);
	calcBmi();
	showAnswers(bmiAnswerForm);
})

// Mortgage

var loanCalcBtn = selectId("mortgage-calc");
var loanAnswerForm = selectId("mortgage-answer-alert");

function calcMortgage () {
	var loan = selectId("mortgage-loan").value;
	var apr = selectId("mortgage-apr").value;
	var term = selectId("mortgage-term").value;

	loanAnswerForm.innterHTML = loan * apr * ((1 + apr)^term) / (((1 + apr)^term) - 1);

}

loanCalcBtn.addEventListener("click", function() {
	hideAnswers(basicAnswerForm);
	hideAnswers(tripAnswerForm);
	hideAnswers(bmiAnswerForm);
	calcMortgage();
	showAnswers(loanAnswerForm);
});

// helpers


function hideAnswers (form) {
	form.style.display = "none";
}

function showAnswers (form) {
	form.style.display = "inherit";
}

hideAnswers(basicAnswerForm);
hideAnswers(tripAnswerForm);
hideAnswers(bmiAnswerForm);
hideAnswers(loanAnswerForm);

}