//MISSION 1 — Select & Modify: Str8-up H4cked
//grab all the collection card titles
var showcases = document.querySelectorAll(".collection-card-title");
//for each collection title
for(var i = 0; i < showcases.length; i++) {
  //change the text content
  showcases[i].textContent = "WDI Rulez: str8-up h4cked";
}

//MISSION 2 - Create & Append: More Octocat
var searchBox = document.querySelector(".collection-listing-search");
var octocat = document.createElement("span");
octocat.className = "mega-octicon";
octocat.className += " octicon-mark-github";
octocat.setAttribute("id", "wdi-octocat");
searchBox.appendChild(octocat);

//MISSION 3 - Styling with Javascript: Big Kitty
octocat.style.fontSize = "200px"
octocat.style.color = "pink"

//MISSION 4 — Set Event Listeners
var octocat = document.querySelector("#wdi-octocat")
octocat.addEventListener("click", function() {
  alert("meow!")
})

//BONUS MISSION
octocat.addEventListener("mouseenter", function(e) {
  e.target.style.color = "grey"
})
octocat.addEventListener("mouseleave", function(e) {
  e.target.style.color = "pink"
})
