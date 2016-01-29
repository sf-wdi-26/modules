// globals
var weeklyQuakesEndpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
var $infoRowTarget;
var map;

function fetchQuakeData(){
  $.get(weeklyQuakesEndpoint, function(response){
    response.features.forEach(function(quake) {
      // Add title of the quake
      var title = quake.properties.title;
      // In UNIX time (miliseconds) find the difference between the time now and the time
      // when the quake happened. Then convert to hours
      var hoursAgo = Math.round(
        ( Date.now() - quake.properties.time ) / (1000*60*60)
      );
      //create info element
      //set inner text to include title & time difference
      // Append the info to the page
      $infoRowTarget.append("<p>")
                    .append(title + " / " + hoursAgo + " hours ago");
      // Create the map markers
      var lat = quake.geometry.coordinates[1];
      var lng = quake.geometry.coordinates[0];
      new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        title: title
      });
    });
  })
}

// render a map
function createMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 37.78, lng: -122.44},
    zoom: 1
  });
}

function init() {
  $infoRowTarget = $("#info");
  //render a map
  createMap();
  fetchQuakeData();
}