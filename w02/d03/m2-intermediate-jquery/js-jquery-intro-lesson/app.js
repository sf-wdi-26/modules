$(document).ready(function() {
    // alert("Everything is ready, let's do this");

    var newHomes = [
    {address: "27569 Cedarwood Drive", sf: "2,535", bedrooms: 3, baths: 2.5, price: "$496,500"},
    {address: "316 Annandale Drive", sf: "1,326", bedrooms: 4, baths: 2, price: "$275,000"},
    {address: "251 Grandview Road", sf: "3,800", bedrooms: 3, baths: 2, price: "$699,900"},
    {address: "28571 Manitoba", sf: "2,960", bedrooms: 4, baths: 3.5, price: "$775,000"}
	];


$("#template").clone().appendTo("tbody");

// pseudocode
// get each object from newHomes array
// create new tr for each object in array
// create new td for each value 
// append each VALUE to corresping th tag


function addNewHomeListing () {
	for (i=0; i<newHomes.length; i++) {
		var homeObject = newHomes[i];

		var newAdress = homeObject.address;
		console.log(newAdress);
		var newSqFt = homeObject.sf;
		var newBedrooms = homeObject.bedrooms;
		var newBaths = homeObject.baths;
		var newPrice = homeObject.price;
		var newRow = $("<td>" + newAdress +  "</td>");
		
		console.log(newRow);
		newRow.append("#templates");



		// for (var key in homeObject) {
		// 	var newHomeDetails = homeObject[key];
			// console.log(newHomeDetails);
			// var newRow = $("<td><tr>"  "</td></tr>");
			// newRow.append("tbody");
			// console.log(newRow);
			// $("#template").clone().appendTo("tbody");
		// }
	}
}

$("#addHome").on("click", function() {

	addNewHomeListing();
})










});

