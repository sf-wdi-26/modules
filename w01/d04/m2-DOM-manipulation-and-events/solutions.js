//MISSION1 — Select & Modify: Str8-up H4cked

//grab all the collection card titles
var showcases = document.querySelectorAll("collection-card-title");
//for each collection title
for(var i = 0; i < showcases.length; i++) {
  //change the text content
  showcases[i].textContent = "WDI Rulez: str8-up h4cked";
}

//MISSION2 - Create & Append: More Octocat
var searchBox = document.querySelector(".collection-listing-search");
var octocat = document.createElement("span");
octocat.className = "mega-octicon";
octocat.className += " octicon-mark-github";

