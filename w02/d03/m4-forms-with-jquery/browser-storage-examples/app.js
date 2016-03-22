var form = document.getElementById("form");

var btn = document.getElementById("btn")

btn.addEventListener("click", function(e) {
	e.preventDefault();

	var formInput = form.value;
	var storeLocal = localStorage.foo = formInput;

	console.log(formInput);
})
