# AJAX + Google Maps

| Objectives |
| :--- |
| Practice AJAX with the USGS Earthquake API |
| Follow the Google Maps tutorial & problem solve adding pins to a map |

## GeoQuakes
In this lab we will be using live data from the USGS (United States Geological Survey), specifically a data set showing significant earthquakes (M4.0 or greater) from the past week.

**Our goal is to**:  
- List information about each quake.
- Display a Google Map with a pin at the epicenter of each quake.

#### Part 1. Rendering Data
Take a moment to familiarize yourself with the dataset by opening it in your browser: [http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson](http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson).

+ What is the structure of the data?
    + How many earthquakes does it list?
    + How would you grab the first earthquake?
        * How would you grab it's title?
        * How would you grab it's geological coordinates:
            - *latitude*?
            - *longitude*?
        * When did it happen?
            - How many hours ago is that?

Now, take a moment to familiarize yourself with the layout in `index.html`.
- Your short term goal is to render each *title* to the "info" section of the page (see the commented example in your HTML)
    - Psuedo Code:
        - grab the data from the USGS endpoint.
        - loop over it
        - add each title to the page

#### Part 2. Add Google Maps
- Your next goal is to integrate Google Maps:
    - Follow the tutorial at [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
        + Note that you will need to sign up for an API key. (See `index.html#L13`)
        + Be VERY careful when you copy paste code!
    - Please center your map on San Francisco: `{ lat: 37.78, lng: -122.44}`
    - You may also want to zoom out if you want to see quakes worldwide

#### Part 3. Add pins to your map
Once you've got the map to show up, your next goal is to drop a single pin on San Francisco. This is a sanity check.  
- Next, can you add only the first earthquake to the map?
- Can you add pins for *all* the earthquakes to the map?

#### Bonus:  
- Calculate how long ago the quake occured and add it to the page. E.g. "28 hours ago".
- Parse the title to only include the location, E.g. Instead of "M 4.2 - 1km ESE of Fontana, California", it should just say "Fontana, California"
- Create a visual indicator of the magnitude of a quake. For instance, maybe a 4.0 is indicated by a "yellow" dot, a 5.0 by an "orange" dot, and anything larger is "red".
